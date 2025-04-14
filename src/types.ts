export interface Player {
  account_id: number;
  team: number;
  hero_id: number;
  kills: number;
  deaths: number;
  assists: number;
  level: number;
  last_hits: number;
  denies: number;
  net_worth: number;
}

export interface MatchInfo {
  match_id: string;
  start_time: number;
  duration_s: number;
  winning_team: number;
  players: Player[];
}

export interface LeaderboardPlayer {
  account_id: number;
  rank: number;
  name: string;
  score: number;
}

export interface PatchNote {
  title: string;
  pub_date: string;
  link: string;
  content: string;
  category: string;
}

export interface Region {
  id: string;
  name: string;
}

export const REGIONS: Region[] = [
  { id: 'Europe', name: 'Europe' },
  { id: 'Asia', name: 'Asia' },
  { id: 'NAmerica', name: 'North America' },
  { id: 'SAmerica', name: 'South America' },
  { id: 'Oceania', name: 'Oceania' }
];