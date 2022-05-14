export type Film = {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  planets: string[];
};

export type FilmCreateUpdate = Omit<
  Film,
  'id' | 'episode_id' | 'release_date' | 'planets'
>;
