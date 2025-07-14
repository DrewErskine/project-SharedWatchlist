import React from 'react';
import { ChevronUp, ChevronDown, Check, Edit2, Trash2 } from 'lucide-react';
import { Movie } from '../types/Movie';

interface VotingButtonsProps {
  movie: Movie;
  isAdmin?: boolean;
  onVote: (movieId: string, vote: 'up' | 'down') => void;
  onMarkWatched: (movieId: string) => void;
  onEdit?: (movieId: string) => void;
  onDelete?: (movieId: string) => void;
}

export default function VotingButtons({ 
  movie, 
  isAdmin = false, 
  onVote, 
  onMarkWatched, 
  onEdit, 
  onDelete 
}: VotingButtonsProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* Voting Buttons */}
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
        <button
          onClick={() => onVote(movie.id, 'up')}
          className={`p-2 transition-colors ${
            movie.userVote === 'up'
              ? 'bg-green-500 text-white'
              : 'hover:bg-green-100 text-gray-600 hover:text-green-600'
          }`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <span className="px-3 py-2 text-sm font-medium text-gray-700 min-w-[2rem] text-center">
          {movie.votes}
        </span>
        <button
          onClick={() => onVote(movie.id, 'down')}
          className={`p-2 transition-colors ${
            movie.userVote === 'down'
              ? 'bg-red-500 text-white'
              : 'hover:bg-red-100 text-gray-600 hover:text-red-600'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Mark as Watched */}
      <button
        onClick={() => onMarkWatched(movie.id)}
        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        title="Mark as watched"
      >
        <Check className="w-4 h-4" />
      </button>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit?.(movie.id)}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Edit movie"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(movie.id)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Delete movie"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}