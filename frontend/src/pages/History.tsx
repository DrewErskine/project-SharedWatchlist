import React, { useState } from 'react';
import { Calendar, Search, Filter, RotateCcw } from 'lucide-react';
import { Movie } from '../types/Movie';
import { watchedMovies } from '../utils/mockData';

export default function History() {
  const [movies, setMovies] = useState<Movie[]>(watchedMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'watchedDate' | 'votes' | 'title'>('watchedDate');

  const handleUnwatchMovie = (movieId: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== movieId));
    // In real app, this would move back to main watchlist
  };

  const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'watchedDate':
          return new Date(b.watchedAt || 0).getTime() - new Date(a.watchedAt || 0).getTime();
        case 'votes':
          return b.votes - a.votes;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Watch History</h1>
              <p className="text-gray-600">
                {movies.length} movies watched • Great job on movie night!
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search watched movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'watchedDate' | 'votes' | 'title')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="watchedDate">Sort by Watch Date</option>
                <option value="votes">Sort by Votes</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid gap-6">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Movie Poster */}
                  <div className="sm:w-32 sm:h-48 h-40 bg-gray-200 flex-shrink-0 relative">
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
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Watched
                    </div>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span>Final votes: {movie.votes}</span>
                          <span>Added by {movie.addedBy}</span>
                          {movie.watchedAt && (
                            <span>Watched {movie.watchedAt.toLocaleDateString()}</span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleUnwatchMovie(movie.id)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Move back</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No watched movies yet</h3>
            <p className="text-gray-600">
              Movies you mark as watched will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}