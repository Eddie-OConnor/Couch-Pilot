# AI Movie Picker

## Project Description
AI Movie Picker recommends a top 500 IMDb movie based on a user's answers to three questions. It solves the chore of picking a movie when you can't decide or can't find something to watch.

## Technologies Used
- HTML, JS, CSS
- OpenAI
- Supabase
- Langchain
- APIs
- Vector Embeddings
- Frontend: Vite
- Backend: Express (Node.js)

## Installation Instructions
1. Clone the repository: `git clone https://github.com/your-username/ai-movie-picker.git`
2. Navigate to the project folder: `cd ai-movie-picker`
3. Install dependencies: `npm install`
4. Create a `.env` file and add the following keys with your own API keys:
   - `OPENAI_API_KEY`
   - `SUPABASE_API_KEY`
   - `SUPABASE_URL`
   - `OMDB_API_KEY`
5. Start the server: `npm start`
6. Start the frontend (in a separate terminal): `npm run dev`

## Usage
1. Answer the questions presented.
2. Click the submit button to get a movie recommendation.
3. Start over if recommended movie is not desireable

## Contributing
Contributions are welcome! Please follow these guidelines:
- Fork the repository.
- Create a new branch: `git checkout -b feature/new-feature`
- Make your changes and commit them: `git commit -m 'Add new feature'`
- Push to the branch: `git push origin feature/new-feature`
- Submit a pull request.

## Credits
- [OpenAI](https://www.openai.com/)
- [Supabase](https://supabase.io/)
- [OMDb API](https://www.omdbapi.com/)
- [Vite](https://vitejs.dev/)

## License
This project is open source. [License details](LICENSE)
