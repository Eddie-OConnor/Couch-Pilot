// index.js
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const submitBtn = document.getElementById('submit-btn')
const favMovie = document.getElementById('favorite-movie')

submitBtn.addEventListener('click', async function(e){
    e.preventDefault()
    const movieMood = document.getElementById('movie-mood')
    const funOrSerious = document.getElementById('fun-or-serious-movie')
    const userInput = favMovie.value + ' ' + movieMood.value + ' ' + funOrSerious.value
    loadGraphic()    
    main(userInput)
})

async function fetchKeys(){
    const response = await fetch('/.netlify/functions/fetchApi')
    const {openai, supabase, omdbApiKey} = await response.json()
    return {openai, supabase, omdbApiKey}
}

async function main(input){
    const { openai, supabase, omdbApiKey } = await fetchKeys();
    const embedding = await createUserEmbedding(input, openai)
    const match = await findNearestMatch(embedding, supabase)
    if(!match){
        alert('Oops! No matching movies passed verification. Please try again with different preferences. If the issue persists please contact support')
    }
    const movie = await identifyMovie(match, supabase)
    const formattedMovie = await formatMovie(movie, omdbApiKey)
    localStorage.setItem('movieRecommendation', formattedMovie.title)
    localStorage.setItem('recommendationSummary', formattedMovie.summary)
    localStorage.setItem('moviePoster', formattedMovie.poster)
    window.location.href = 'results.html'
}


/** movie functions */


async function createUserEmbedding(input, openai){
    try {
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input
        })
        return embeddingResponse.data[0].embedding
    } catch (e){
        console.error ('there was an error creating an embedding')
    }
}


// see supabase-sql-queries.txt for sql queries used in findNearestMatch() and identifyMovie()


async function findNearestMatch(embedding, supabase) {
    try {
        const { data } = await supabase.rpc('match_movies', {
            query_embedding: embedding,
            match_threshold: 0.50,
            match_count: 20 // Increase match_count to get more matches if there are issues returning a movie
        })
        for (let matchIndex = 0; matchIndex < data.length; matchIndex++) {
            const matchedMovie = data[matchIndex].content
            if (await verifyMovie(matchedMovie, supabase)) {
                return matchedMovie
            }
        }
        console.error('No matching movies passed verification')
    } catch (e) {
        console.error('There was an error finding matches in supabase')
    }
}

/* verfies that the matched movie is not the one the user declared as their favorite */

async function verifyMovie(match, supabase) {
    try {
        const { data } = await supabase.rpc('identify_movie', {
            match: match,
        });
        const title = data[0].content
        const extractedWords = extractWordsFromFavMovie(favMovie)
        if (!containsWords(title, extractedWords)){
            return true
        } else {
            return false
        }
    } catch (e) {
        console.error('There was an error verifying the movie in supabase:', e.message)
    }
}


async function identifyMovie(match, supabase){
    try {
        const {data} = await supabase.rpc('identify_movie', {
            match: match,
        })
        return data      
    } catch (e){
        console.error('there was an error identifying the movie in supabase')
    }
}

/* formats movie information to be inserted into results html */

async function formatMovie(movie, omdbApiKey){
    try {
        const movieInfo = movie[0].content
        const movieInfoTrimmed = movieInfo.match(/^(.*): (\d{4})/)
        const movieTitle = movieInfoTrimmed[1].trim()
        const movieYear = movieInfoTrimmed[2]
        let movieTitleAndYear = `${movieTitle} (${movieYear})`
        const movieSummary = movie.slice(1).map(item => item.content).join(' ')
        const shortenedSummary = await shortenSummary(movieSummary, openai)
        const moviePoster = await getMoviePoster(movieTitle, omdbApiKey)
        return {
            title: movieTitleAndYear,
            summary: shortenedSummary,
            poster: moviePoster
        }
    } catch (e){
        console.error('there was an issue extracting the movie title and year')
    }
}

/* uses ai to shorten and correct movie summary pulled from chunked text */

async function shortenSummary(summary, openai){
    const messages = [
        {
            role: 'system',
            content: `You shorten ${summary} into no more than four sentences and correct any duplicate words and grammatical errors.`
        },
        {
            role: 'user',
            content: `${summary}`
        }
    ]
    try {
       const response = await openai.chat.completions.create({
           model: 'gpt-4',
           messages: messages
       })
       const chatResponse = response.choices[0].message.content
       return chatResponse
    } catch (e){
        console.error('there was an error in openai shortening the movie summary')
    }
}


async function getMoviePoster(input, omdbApiKey){
    const response = await fetch
        (`https://www.omdbapi.com/?s=${input}&apikey=${omdbApiKey}&type=movie`)
    if (response.ok){
        const data = await response.json()
        return data.Search[0].Poster
    } else {
        console.error('Error fetching movie poster from API')
    }
}


// utility functions


async function getTopMovies(){
    const { omdbApiKey } = await fetchKeys();
    for (let imdbId of topImdbIds){
        const response = await fetch 
            (`https://www.omdbapi.com/?&apikey=${omdbApiKey}&i=${imdbId}&plot=full`)
        if (response.ok){
            const movie = await response.json()            
            const formattedString = `${movie.Title}: ${movie.Year} | ${movie.Rated} | ${movie.Runtime} | ${movie.imdbRating} rating`
            console.log(formattedString) 
            console.log(movie.Plot)
            console.log()
            // break --> useful for testing to avoid rate limits
        } else {
            console.error('error fetching top movies')
        }
    }
}


/** uncomment function to run to get top movies**/
// getTopMovies()


async function createAndStoreMovieEmbeddings() {
    const { openai, supabase } = await fetchKeys();
    try {
        const textFile = await splitDocument('movies.txt')
        const textChunks = textFile.map(textChunk => textChunk.pageContent)
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: textChunks
        })
        const data = Object.values(embeddingResponse)[1].map((data, i) => {
            return {
                content: textChunks[i],
                embedding: data.embedding
            }
        })
        const {error} = await supabase.from('movies').insert(data)
        if (error){
            throw new Error('issue inserting data into supabase')
        }
        console.log('SUCCESS!');
    } catch (e) {
        console.error('error: ' + e.message)
        throw e
    }
}


/** uncomment function to run if new movies added to movies.txt **/
// createAndStoreMovieEmbeddings()


async function splitDocument(document){
    try {
        const response = await fetch(document)
        if (!response.ok){
            throw new Error('Network response not ok')
        }
        const text = await response.text()
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 250,
            chunkOverlap: 35,
            separators: ["\n"]
        });
        const output = await splitter.createDocuments([text])
        return output
    } catch (e) {
        console.error('there was an issue splitting text')
        throw e
    }
}


function extractWordsFromFavMovie(favMovie) {
    const STOP_WORDS = ['the', 'i', 'like', 'and', 'a', 'to', 'of']
    try {
        const extractedWords = favMovie.value.toLowerCase().match(/\b\w+\b/g) || []
        const filteredWords = extractedWords.filter(word => !STOP_WORDS.includes(word))
        return filteredWords
    } catch (e) {
        console.error('Error extracting words from favMovie:', e.message);
        return [];
    }
}


function containsWords(text, words) {
    try {
        const contains = words.some(word => text.toLowerCase().includes(word));
        if (contains){
            return true
        } else {
            return false
        }
    } catch (e) {
        console.error('Error checking if text contains words:', e.message);
    }
}

/* UX functions */


function updateCharCount(textareaId, charCountId, maxLength){
    const textArea = document.getElementById(textareaId)
    const charCount = document.getElementById(charCountId)
    
    textArea.addEventListener('input', function(){
        const currentLength = textArea.value.length
        charCount.textContent = `${currentLength}/${maxLength}`
    })
}


updateCharCount('favorite-movie', 'char-count1', 100);
updateCharCount('movie-mood', 'char-count2', 100);
updateCharCount('fun-or-serious-movie', 'char-count3', 100);


function enableSubmitBtn(){
    const textArea1 = document.getElementById('favorite-movie')
    const textArea2 = document.getElementById('movie-mood')
    const textArea3 = document.getElementById('fun-or-serious-movie')
    const form = document.getElementById('movie-form')
    let textAreaValid = false
    
    form.addEventListener('input', function(){
        if(textArea1.value.length > 0 && textArea2.value.length > 0 && textArea3.value.length > 0){
            textAreaValid = true
            submitBtn.removeAttribute('disabled')
        } else {
            textAreaValid = false
        }
    })
}


enableSubmitBtn()


function loadGraphic(){
    const movieForm = document.getElementById('movie-form')
    movieForm.style.display = 'none'
    document.getElementById('load-graphic').classList.toggle('hidden') 
}