// config.js

import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

async function fetchKeys(){
    try {
        const response = await fetch('https://jazzy-taffy-895ddf.netlify.app/.netlify/functions/fetchApi')
        if(response.ok){
            const data = await response.json()
            return data
        } else {
            console.error('error fetching keys', response.statusText)
        }
    } catch (e){
        console.error('error fetching keys', e)
  }
}

export async function initializeApiInstances(){
    try {
        const apiKeys = await fetchKeys()
        /* OpenAI config */
        if (!apiKeys.openaiApiKey) throw new Error("OpenAI API key is missing or invalid.");
        const openai = new OpenAI({
            apiKey: apiKeys.openaiApiKey,
            dangerouslyAllowBrowser: true
        });

        /* Supabase config */
        const privateKey = apiKeys.supabaseApiKey
        if (!privateKey) throw new Error(`Supabase API key is missing or invalid`);
        const url = apiKeys.supabaseUrl;
        if (!url) throw new Error(`Supabase URL is missing or invalid`);
        const supabase = createClient(url, privateKey);

        /* OMDb API config */
        const omdbApiKey = apiKeys.omdbApiKey
        if(!omdbApiKey) throw new Error('OMDb API key is missing or invalid')

        return {openai, supabase, omdbApiKey}
    } catch (e){
        console.error('error initializing instances', e)
    }
}

export const topImdbIds = [
    // pull top movies using getTopMovies() in index.js
]
