import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_TOKEN = process.env.REACT_APP_TMDB_APP_TOKEN;
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWM4N2MyNDMwNzQ2ZjZlMTcyYjdmZDQzNGQyZWIyOCIsInN1YiI6IjYzNjRjNzNlMTY4NGY3MDA4YWVhMmZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y5OlCz3WO9-eQTMRBnTooUAcXvoTc9xak963yCJ23p8"
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
