import axios from "axios";

export const BASE_URL: string = "https://youtube-v31.p.rapidapi.com";

const options: {
  url: string;
  params: { maxResults: string };
  headers: { [key: string]: string };
} = {
  url: BASE_URL,
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async <T,>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(`${BASE_URL}/${url}`, options);
  return data;
};
