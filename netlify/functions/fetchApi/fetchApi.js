// fetchApi.js

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const handler = async (event) => {
    try {
          const openaiApiKey = process.env.OPENAI_API_KEY
          const supabaseApiKey = process.env.SUPABASE_API_KEY
          const supabaseUrl = process.env.SUPABASE_URL
          const omdbApiKey = process.env.OMDB_API_KEY
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          openai: openaiApiKey,
          supabaseApiKey: supabaseApiKey,
          supabaseUrl: supabaseUrl,
          omdbApiKey: omdbApiKey
         }),
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
  }
  

module.exports = { handler }
