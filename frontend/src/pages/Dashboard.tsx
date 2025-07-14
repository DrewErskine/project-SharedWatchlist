import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Shuffle, Filter, Search } from 'lucide-react';
import { Movie } from '../types/Movie';
import { mockMovies, currentUser } from '../utils/mockData';
import MovieCard from '../components/MovieCard';

export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'date' | 'title'>('votes');

  const handleVote = (movieId: string, vote: 'up' | 'down') => {
    setMovies(prev => prev.map(movie => {
      if (movie.id === movieId) {
        const currentVote = movie.userVote;
        let newVotes = movie.votes;
        let newUserVote: 'up' | 'down' | null = vote;

        // Remove previous vote
        if (currentVote === 'up') newVotes--;
        if (currentVote === 'down') newVotes++;

        // Add new vote or remove if same
        if (vote === currentVote) {
          newUserVote = null;
        } else {
          if (vote === 'up') newVotes++;
          if (vote === 'down') newVotes--;
        }

        return { ...movie, votes: newVotes, userVote: newUserVote };
      }
      return movie;
    }));
  };

  const handleMarkWatched = (movieId: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== movieId));
    // In real app, this would move to watched list
  };

  const handlePickRandom = () => {
    const topMovies = movies.filter(movie => movie.votes > 0);
    const randomMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
    if (randomMovie) {
      alert(`Tonight we're watching: ${randomMovie.title}!`);
    }
  };

  const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes': return b.votes - a.votes;
        case 'date': return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'title': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Movie Night Watchlist</h1>
              <p className="text-gray-600 mt-1">
                {movies.length} movies waiting • {movies.filter(m => m.votes > 0).length} with votes
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePickRandom}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors shadow-lg"
              >
                <Shuffle className="w-5 h-5" />
                <span>Pick Something!</span>
              </button>
              <Link
                to="/add"
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Movie</span>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'votes' | 'date' | 'title')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="votes">Sort by Votes</option>
                <option value="date">Sort by Date Added</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid gap-6">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isAdmin={currentUser.isAdmin}
                onVote={handleVote}
                onMarkWatched={handleMarkWatched}
                onEdit={(id) => console.log('Edit movie:', id)}
                onDelete={(id) => console.log('Delete movie:', id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No movies found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding some movies to your watchlist'}
            </p>
            <Link
              to="/add"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Movie</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}