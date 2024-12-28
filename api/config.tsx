export const baseUrl = "https://api.themoviedb.org/3/movie/";
export const baseImageUrl = "https://image.tmdb.org/t/p/w500";

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
