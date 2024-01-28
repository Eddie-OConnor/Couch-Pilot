// fetchApi.js

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

const handler = async (event) => {
    try {
        const keys = {
            openaiApiKey: process.env.OPENAI_API_KEY,
            supabaseApiKey: process.env.SUPABASE_API_KEY,
            supabaseUrl: process.env.SUPABASE_URL,
            omdbApiKey: process.env.OMDB_API_KEY
        }
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify({ 
    //       openai: keys.openaiApiKey,
    //       supabaseApiKey: keys.supabaseApiKey,
    //       supabaseUrl: keys.supabaseUrl,
    //       omdbApiKey: keys.omdbApiKey
    //      }),
    //   }
        const instances = initializeApiInstances(keys)
        return instances
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
  }

export async function initializeApiInstances(keys){
    try {
        /* OpenAI config */
        if (keys.openaiApiKey) throw new Error("OpenAI API key is missing or invalid.");
        const openai = new OpenAI({
            apiKey: keys.openaiApiKey,
            dangerouslyAllowBrowser: true
        });

        /* Supabase config */
        const supabaseApiKey = keys.supabaseApiKey
        if (!supabaseApiKey) throw new Error(`Supabase API key is missing or invalid`);
        const supabaseUrl = keys.supabaseUrl;
        if (!supabaseUrl) throw new Error(`Supabase URL is missing or invalid`);
        const supabase = createClient(supabaseUrl, supabaseApiKey);

        /* OMDb API config */
        const omdbApiKey = keys.omdbApiKey
        if(!omdbApiKey) throw new Error('OMDb API key is missing or invalid')

        return {openai, supabase, omdbApiKey}
    } catch (e){
        console.error('error initializing instances', e)
    }
}



module.exports = { handler }
