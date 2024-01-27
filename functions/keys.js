// keys.js

import express from "express"

const app = express()

app.get('/keys', async (req, res) => {
    try {
        const openaiApiKey = process.env.OPENAI_API_KEY
        const supabaseApiKey = process.env.SUPABASE_API_KEY
        const supabaseUrl = process.env.SUPABASE_URL
        const omdbApiKey = process.env.OMDB_API_KEY

        res.json({openaiApiKey, supabaseApiKey, supabaseUrl, omdbApiKey})
    } catch (e) {
        console.error('error fetching key', error)
        res.status(500).json({error: 'internal server error'})
    }
})

export default async function handler(req, res){
    await app(req, res)
}