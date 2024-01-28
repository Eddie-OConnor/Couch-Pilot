// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

// async function fetchKeys(){
//     try {
//         const response = await fetch('https://jazzy-taffy-895ddf.netlify.app/.netlify/functions/fetchApi')
//         if(response.ok){
//             const data = await response.json()
//             return data
//         } else {
//             console.error('error fetching keys', response.statusText)
//         }
//     } catch (e){
//         console.error('error fetching keys', e)
//   }
// }

export async function initializeApiInstances(){
    try {
        // const apiKeys = await fetchKeys()

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
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
