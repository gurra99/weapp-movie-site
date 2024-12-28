import { IMovie } from "../models/movie";

export function sortByReleaseDate(movies: IMovie[]): IMovie[] {
  return movies.sort((a, b) => {
    if (!a.release_date || !b.release_date) return 0;
    return (
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  });
}
