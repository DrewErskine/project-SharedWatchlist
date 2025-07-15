package com.drewerskine.sharedwatchlist.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "watchlist_items")
public class WatchlistItem {
    @Id
    @GeneratedValue
    private Long id;
    
    private String title;
    private String description;
    private String posterUrl;
    private String type; // MOVIE, TV_SHOW, etc.
    private Integer year;
    private String genre;
    private Double rating;
    private Integer runtime; // in minutes
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "added_by_user_id")
    private User addedBy;
    
    @ManyToMany
    @JoinTable(
        name = "watchlist_item_votes",
        joinColumns = @JoinColumn(name = "watchlist_item_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @Builder.Default
    private Set<User> votes = new HashSet<>();
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime watchedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
