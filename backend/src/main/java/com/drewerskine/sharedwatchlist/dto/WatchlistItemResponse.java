package com.drewerskine.sharedwatchlist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WatchlistItemResponse {
    private Long id;
    private String title;
    private String description;
    private String posterUrl;
    private String type;
    private Integer year;
    private String genre;
    private Double rating;
    private Integer runtime;
    private String addedByEmail;
    private int voteCount;
    private boolean hasUserVoted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime watchedAt;
}
