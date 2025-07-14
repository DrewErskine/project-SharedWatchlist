export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  year?: number;
  genre?: string;
  votes: number;
  isWatched: boolean;
  addedBy: string;
  addedAt: Date;
  watchedAt?: Date;
  userVote?: 'up' | 'down' | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface WatchlistSettings {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  allowVoting: boolean;
  notificationsEnabled: boolean;
  members: User[];
}