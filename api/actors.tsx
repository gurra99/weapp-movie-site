import { baseUrl, fetchOptions } from "./config";

export const fetchActorsByMovieId = async (movie_id: number) => {
  const url = baseUrl + `${movie_id}/credits`;

  const res = await fetch(url, fetchOptions("GET"));

  if (!res.ok) {
    throw new Error("Failed to fetch actors");
  }
  const json = await res.json();
  return json.cast;
};
