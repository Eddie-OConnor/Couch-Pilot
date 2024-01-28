// fetchApi.js

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";


export async function initializeApiInstances(){
    try {
        /* OpenAI config */
        if (process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        /* Supabase config */
        const privateKey = process.env.OPENAI_API_KEY
        if (!privateKey) throw new Error(`Supabase API key is missing or invalid`);
        const url = process.env.SUPABASE_URL;
        if (!url) throw new Error(`Supabase URL is missing or invalid`);
        const supabase = createClient(url, privateKey);

        /* OMDb API config */
        const omdbApiKey = process.env.OMDB_API_KEY
        if(!omdbApiKey) throw new Error('OMDb API key is missing or invalid')

        return {openai, supabase, omdbApiKey}
    } catch (e){
        console.error('error initializing instances', e)
    }
}

const handler = async (event) => {
  try {
        const openaiApiKey = process.env.OPENAI_API_KEY
        const supabaseApiKey = process.env.SUPABASE_API_KEY
        const supabaseUrl = process.env.SUPABASE_URL
        const omdbApiKey = process.env.OMDB_API_KEY
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        openaiApiKey,
        supabaseApiKey,
        supabaseUrl,
        omdbApiKey
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
