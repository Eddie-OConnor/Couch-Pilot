// server.js

import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())

/* UPDATE NETLIFY URL BELOW BEFORE COMITTING */

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://jazzy-taffy-895ddf.netlify.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/keys', (req, res) => {
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})