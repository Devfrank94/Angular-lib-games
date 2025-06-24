export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number;
  playtime: number;
  genres: Genre[];
  platforms: PlatformWrapper[];
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image_background: string;
  image: string;
  games_count: number;
}

export interface Creator {
  id: number;
  name: string;
  slug: string;
  image: string;
  image_background: string;
  games_count: number;
  positions: Position[];
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  image_background: string;
  games_count: number;
}

export interface Position {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformWrapper {
  platform: Platform;
  released_at: string;
}

export interface GameResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface PlatformResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Platform[];
}

export interface CreatorResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Creator[];
}

export interface DeveloperResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Developer[];
}
