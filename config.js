// config.js

import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

// async function fetchKeys(){
//     try {
//         const response = await fetch('https://jazzy-taffy-895ddf.netlify.app/.netlify/functions/keys')
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
        const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY
        if (!openaiApiKey) throw new Error("OpenAI API key is missing or invalid.");
        const openai = new OpenAI({
            apiKey: openaiApiKey,
            dangerouslyAllowBrowser: true
        });

        /* Supabase config */
        const privateKey = import.meta.env.VITE_SUPABASE_API_KEY
        if (!privateKey) throw new Error(`Supabase API key is missing or invalid`);
        const url = import.meta.env.VITE_SUPABASE_URL
        if (!url) throw new Error(`Supabase URL is missing or invalid`);
        const supabase = createClient(url, privateKey);

        /* OMDb API config */
        const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY
        if(!omdbApiKey) throw new Error('OMDb API key is missing or invalid')

        return {openai, supabase, omdbApiKey}
    } catch (e){
        console.error('error initializing instances', e)
    }
}

export const topImdbIds = [
    'tt0111161', 'tt0068646', 'tt0468569', 'tt0071562', 'tt0167260',
    'tt0110912', 'tt0108052', 'tt0060196', 'tt0050083', 'tt1375666',
    'tt0137523', 'tt0120737', 'tt0109830', 'tt0080684', 'tt6316138',
    'tt0167261', 'tt0133093', 'tt0099685', 'tt0073486', 'tt0047478',
    'tt4633694', 'tt0816692', 'tt0317248', 'tt0245429', 'tt0120815',
    'tt0118799', 'tt0114814', 'tt0114369', 'tt0110413', 'tt0102926',
    'tt0076759', 'tt0038650', 'tt4154756', 'tt2582802', 'tt1675434',
    'tt0482571', 'tt0407887', 'tt0253474', 'tt0209144', 'tt0172495',
    'tt0120689', 'tt0120586', 'tt0110357', 'tt0103064', 'tt0095765',
    'tt0095327', 'tt0088763', 'tt0082971', 'tt0078788', 'tt0078748',
    'tt0064116', 'tt0054215', 'tt0047396', 'tt0034583', 'tt0032553',
    'tt0027977', 'tt0021749', 'tt5311514', 'tt2380307', 'tt1853728',
    'tt1345836', 'tt0910970', 'tt0476735', 'tt0405094', 'tt0364569',
    'tt0169547', 'tt0119698', 'tt0112573', 'tt0090605', 'tt0087843',
    'tt0082096', 'tt0081505', 'tt0057012', 'tt0051201', 'tt0050825',
    'tt0043014', 'tt6966692', 'tt2106476', 'tt1255953', 'tt1049413',
    'tt0435761', 'tt0361748', 'tt0338013', 'tt0211915', 'tt0208092',
    'tt0180093', 'tt0119488', 'tt0119217', 'tt0116231', 'tt0114709',
    'tt0105236', 'tt0093058', 'tt0086879', 'tt0086250', 'tt0086190',
    'tt0075314', 'tt0071853', 'tt0070735', 'tt0066921', 'tt0062622',
    'tt0059578', 'tt0056592', 'tt0056172', 'tt0055630', 'tt0053604',
    'tt0053125', 'tt0052357', 'tt0045152', 'tt0044741', 'tt0042876',
    'tt0042192', 'tt0040522', 'tt0036775', 'tt0033467', 'tt0022100',
    'tt0017136', 'tt0012349', 'tt5027774', 'tt3170832', 'tt2991224',
    'tt2758880', 'tt2140203', 'tt2096673', 'tt1305806', 'tt1291584',
    'tt0993846', 'tt0469494', 'tt0457430', 'tt0434409', 'tt0372784',
    'tt0363163', 'tt0347149', 'tt0268978', 'tt0120735', 'tt0117951',
    'tt0113277', 'tt0112641', 'tt0105695', 'tt0097576', 'tt0096283',
    'tt0095016', 'tt0091251', 'tt0089881', 'tt0083658', 'tt0081398',
    'tt0080678', 'tt0071315', 'tt0060107', 'tt0057115', 'tt0055031',
    'tt0053291', 'tt0050986', 'tt0050976', 'tt0050212', 'tt0047296',
    'tt0046912', 'tt0046438', 'tt0041959', 'tt0040897', 'tt0031679',
    'tt0031381', 'tt0019254', 'tt0018455', 'tt0017925', 'tt0015864',
    'tt0015324', 'tt4857264', 'tt4016934', 'tt3612616', 'tt3315342',
    'tt3011894', 'tt2278388', 'tt2267998', 'tt2119532', 'tt2024544',
    'tt2015381', 'tt1979320', 'tt1895587', 'tt1865505', 'tt1727824',
    'tt1555149', 'tt1454029', 'tt1392214', 'tt1392190', 'tt1205489',
    'tt1201607', 'tt1171701', 'tt1130884', 'tt1069238', 'tt1028532',
    'tt0978762', 'tt0892769', 'tt0861739', 'tt0848228', 'tt0808417',
    'tt0758758', 'tt0477348', 'tt0423866', 'tt0405159', 'tt0395169',
    'tt0386064', 'tt0381681', 'tt0374546', 'tt0353969', 'tt0270053',
    'tt0266697', 'tt0266543', 'tt0264464', 'tt0246578', 'tt0245712',
    'tt0198781', 'tt0167404', 'tt0154420', 'tt0120731', 'tt0120382',
    'tt0118715', 'tt0118694', 'tt0116282', 'tt0114787', 'tt0113247',
    'tt0112471', 'tt0111495', 'tt0109424', 'tt0107290', 'tt0107207',
    'tt0107048', 'tt0105323', 'tt0103639', 'tt0102138', 'tt0101414',
    'tt0099348', 'tt0095953', 'tt0088846', 'tt0088258', 'tt0088247',
    'tt0085334', 'tt0080979', 'tt0079522', 'tt0078841', 'tt0075686',
    'tt0074119', 'tt0073195', 'tt0072890', 'tt0070511', 'tt0070047',
    'tt0068182', 'tt0067185', 'tt0067093', 'tt0066206', 'tt0065214',
    'tt0063522', 'tt0063442', 'tt0061811', 'tt0061722', 'tt0061184',
    'tt0059742', 'tt0058946', 'tt0056801', 'tt0056687', 'tt0056443',
    'tt0056217', 'tt0056111', 'tt0053779', 'tt0053198', 'tt0052618',
    'tt0051808', 'tt0051459', 'tt0050783', 'tt0050613', 'tt0047528',
    'tt0046911', 'tt0046268', 'tt0046250', 'tt0041546', 'tt0037558',
    'tt0036868', 'tt0033870', 'tt0032976', 'tt0032551', 'tt0028950',
    'tt0025316', 'tt0020629', 'tt0010323', 'tt3783958', 'tt3659388',
    'tt3544112', 'tt2948356', 'tt2576852', 'tt2543472', 'tt2370248',
    'tt2265171', 'tt2084970', 'tt1877832', 'tt1856101', 'tt1798709',
    'tt1663202', 'tt1659337', 'tt1504320', 'tt1431045', 'tt1220719',
    'tt1185616', 'tt1010048', 'tt0947798', 'tt0796366', 'tt0790636',
    'tt0454921', 'tt0450259', 'tt0440963', 'tt0401792', 'tt0401383',
    'tt0382932', 'tt0381061', 'tt0378194', 'tt0376968', 'tt0352248',
    'tt0327056', 'tt0325980', 'tt0319061', 'tt0317705', 'tt0287467',
    'tt0283509', 'tt0276919', 'tt0175880', 'tt0168629', 'tt0166924',
    'tt0166896', 'tt0129167', 'tt0117666', 'tt0117589', 'tt0114746',
    'tt0108394', 'tt0107688', 'tt0107048', 'tt0106519', 'tt0106364',
    'tt0099487', 'tt0097937', 'tt0097814', 'tt0097441', 'tt0097216',
    'tt0094226', 'tt0091167', 'tt0088847', 'tt0087553', 'tt0086197',
    'tt0083866', 'tt0080455', 'tt0077405', 'tt0077402', 'tt0075029',
    'tt0073341', 'tt0071615', 'tt0071360', 'tt0071129', 'tt0069762',
    'tt0068361', 'tt0064665', 'tt0063350', 'tt0061418', 'tt0055032',
    'tt0054331', 'tt0053472', 'tt0049833', 'tt0043265', 'tt0040506',
    'tt0039628', 'tt0037382', 'tt0036342', 'tt0031971', 'tt0030341',
    'tt0026138', 'tt0024216', 'tt0022913', 'tt0021884', 'tt0338564',
    'tt0056218', 'tt0756683'
]
