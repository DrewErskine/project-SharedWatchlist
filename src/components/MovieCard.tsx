import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Movie } from '../types/Movie';
import VotingButtons from './VotingButtons';

interface MovieCardProps {
  movie: Movie;
  isAdmin?: boolean;
  onVote: (movieId: string, vote: 'up' | 'down') => void;
  onMarkWatched: (movieId: string) => void;
  onEdit?: (movieId: string) => void;
  onDelete?: (movieId: string) => void;
}

export default function MovieCard({ 
  movie, 
  isAdmin, 
  onVote, 
  onMarkWatched, 
  onEdit, 
  onDelete 
}: MovieCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Movie Poster */}
        <div className="sm:w-32 sm:h-48 h-40 bg-gray-200 flex-shrink-0">
          {movie.imageUrl ? (
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-xs text-center px-2">No Image</span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {movie.title}
                </h3>
                {movie.year && (
                  <span className="text-sm text-gray-500 ml-2 flex-shrink-0">
                    {movie.year}
                  </span>
                )}
              </div>
              
              {movie.genre && (
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mb-2">
                  {movie.genre}
                </span>
              )}
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {movie.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>Added by {movie.addedBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{movie.addedAt.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Voting and Actions */}
            <div className="flex items-center justify-between">
              <VotingButtons
                movie={movie}
                isAdmin={isAdmin}
                onVote={onVote}
                onMarkWatched={onMarkWatched}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}