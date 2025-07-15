package com.drewerskine.sharedwatchlist.controller;

import com.drewerskine.sharedwatchlist.dto.WatchlistItemRequest;
import com.drewerskine.sharedwatchlist.dto.WatchlistItemResponse;
import com.drewerskine.sharedwatchlist.service.WatchlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;

    @GetMapping
    public ResponseEntity<Page<WatchlistItemResponse>> getWatchlist(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable
    ) {
        return ResponseEntity.ok(watchlistService.getWatchlist(userDetails.getUsername(), pageable));
    }

    @PostMapping
    public ResponseEntity<WatchlistItemResponse> addItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody WatchlistItemRequest request
    ) {
        return ResponseEntity.ok(watchlistService.addItem(userDetails.getUsername(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WatchlistItemResponse> updateItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody WatchlistItemRequest request
    ) {
        return ResponseEntity.ok(watchlistService.updateItem(userDetails.getUsername(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id
    ) {
        watchlistService.deleteItem(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/vote")
    public ResponseEntity<WatchlistItemResponse> toggleVote(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(watchlistService.toggleVote(userDetails.getUsername(), id));
    }

    @PostMapping("/{id}/watched")
    public ResponseEntity<WatchlistItemResponse> markAsWatched(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(watchlistService.markAsWatched(userDetails.getUsername(), id));
    }

    @GetMapping("/random")
    public ResponseEntity<WatchlistItemResponse> getRandomItem(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(watchlistService.getRandomItem(userDetails.getUsername()));
    }
}
