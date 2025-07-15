package com.drewerskine.sharedwatchlist.repository;

import com.drewerskine.sharedwatchlist.model.User;
import com.drewerskine.sharedwatchlist.model.WatchlistItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WatchlistItemRepository extends JpaRepository<WatchlistItem, Long> {
    Page<WatchlistItem> findByAddedBy(User user, Pageable pageable);
    
    @Query("SELECT w FROM WatchlistItem w WHERE w.watchedAt IS NULL ORDER BY SIZE(w.votes) DESC")
    List<WatchlistItem> findTopUnwatchedByVotes(Pageable pageable);
    
    @Query("SELECT w FROM WatchlistItem w WHERE w.watchedAt IS NOT NULL AND w.addedBy = ?1")
    Page<WatchlistItem> findWatchedByUser(User user, Pageable pageable);
}
