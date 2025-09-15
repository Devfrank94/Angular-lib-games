export interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  saturated_color: string;
  dominant_color: string;
  metacritic: number;
  playtime: number;
  genres: Genre[];
  platforms: PlatformWrapper[];
  parent_platforms?: PlatformWrapper[];
}

///////////////////// Game Detail ////////////////

export interface GameDetail extends Game {
  description?: string;
  description_raw?: string;
  website?: string;
  added_by_status?: AddedByStatus[];
  achievements_count?: number;
  reddit_url?: string;
  reddit_count?: number;
  twitch_count?: number;
  youtube_count?: number;
  added?: number;
  updated?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  tags?: Tag[];
  screenshots?: Screenshot[];
  stores?: Store[];
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  games_count: number;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  image_background: string;
}

///////////////////// Game Detail ////////////////

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
  results: Game[] | null;
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
