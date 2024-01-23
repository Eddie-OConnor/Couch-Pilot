// results.js

const goAgainBtn = document.getElementById('go-again-btn')

document.addEventListener('DOMContentLoaded', function() {
    loadPage()
});

if (document.readyState === 'complete') {
    loadPage();
}

function loadPage() {
    const movieRecommendation = document.getElementById('movie-recommendation')
    const recommendationSummary = document.getElementById('recommendation-summary')
    const moviePoster = document.getElementById('movie-poster')
    const storedTitle = localStorage.getItem('movieRecommendation')
    const storedSummary = localStorage.getItem('recommendationSummary')
    const storedPoster = localStorage.getItem('moviePoster')
    if (storedTitle && storedSummary) {
        movieRecommendation.innerHTML = storedTitle
        recommendationSummary.innerHTML = storedSummary
        moviePoster.src = storedPoster
    } else {
        console.error("Movie recommendation not found in localStorage.");
    }
}

goAgainBtn.addEventListener('click', function(){
    localStorage.removeItem('movieRecommendation')
    localStorage.removeItem('recommendationSummary')
    localStorage.removeItem('moviePoster')
    window.location.href = 'index.html'
})
