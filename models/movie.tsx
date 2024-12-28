export interface ITopRatedMovies {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}

export interface IMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}
