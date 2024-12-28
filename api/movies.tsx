import { baseUrl, fetchOptions } from "./config";

export const fetchTopMovies = async ({ pageParam }: any) => {
  const url = baseUrl + `top_rated?language=en-US&page=${pageParam}`;

  const res = await fetch(url, fetchOptions("GET"));

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const json = await res.json();
  return json;
};
