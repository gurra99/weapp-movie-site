export const baseUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export function fetchOptions(
  method: string,
  accept: string = "application/json"
) {
  return {
    method: method,
    headers: {
      accept: accept,
      Authorization: `Bearer ${apiKey}`,
    },
  };
}

export const fetchTopMovies = async () => {
  const url = baseUrl + `top_rated?language=en-US&page=1`;

  const res = await fetch(url, fetchOptions("GET"));

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const json = await res.json();
  return json;
};
