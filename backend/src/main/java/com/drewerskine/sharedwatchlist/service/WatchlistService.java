package com.drewerskine.sharedwatchlist.service;

import com.drewerskine.sharedwatchlist.dto.WatchlistItemRequest;
import com.drewerskine.sharedwatchlist.dto.WatchlistItemResponse;
import com.drewerskine.sharedwatchlist.model.User;
import com.drewerskine.sharedwatchlist.model.WatchlistItem;
import com.drewerskine.sharedwatchlist.repository.UserRepository;
import com.drewerskine.sharedwatchlist.repository.WatchlistItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistItemRepository watchlistItemRepository;
    private final UserRepository userRepository;

    public Page<WatchlistItemResponse> getWatchlist(String userEmail, Pageable pageable) {
        User user = getUserByEmail(userEmail);
        return watchlistItemRepository.findByAddedBy(user, pageable)
                .map(item -> mapToResponse(item, user));
    }

    @Transactional
    public WatchlistItemResponse addItem(String userEmail, WatchlistItemRequest request) {
        User user = getUserByEmail(userEmail);
        
        WatchlistItem item = WatchlistItem.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .posterUrl(request.getPosterUrl())
                .type(request.getType())
                .year(request.getYear())
                .genre(request.getGenre())
                .rating(request.getRating())
                .runtime(request.getRuntime())
                .addedBy(user)
                .build();
        
        return mapToResponse(watchlistItemRepository.save(item), user);
    }

    @Transactional
    public WatchlistItemResponse updateItem(String userEmail, Long itemId, WatchlistItemRequest request) {
        User user = getUserByEmail(userEmail);
        WatchlistItem item = getWatchlistItem(itemId);
        
        if (!item.getAddedBy().equals(user)) {
            throw new IllegalStateException("User not authorized to update this item");
        }
        
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setPosterUrl(request.getPosterUrl());
        item.setType(request.getType());
        item.setYear(request.getYear());
        item.setGenre(request.getGenre());
        item.setRating(request.getRating());
        item.setRuntime(request.getRuntime());
        
        return mapToResponse(watchlistItemRepository.save(item), user);
    }

    @Transactional
    public void deleteItem(String userEmail, Long itemId) {
        User user = getUserByEmail(userEmail);
        WatchlistItem item = getWatchlistItem(itemId);
        
        if (!item.getAddedBy().equals(user)) {
            throw new IllegalStateException("User not authorized to delete this item");
        }
        
        watchlistItemRepository.delete(item);
    }

    @Transactional
    public WatchlistItemResponse toggleVote(String userEmail, Long itemId) {
        User user = getUserByEmail(userEmail);
        WatchlistItem item = getWatchlistItem(itemId);
        
        if (item.getVotes().contains(user)) {
            item.getVotes().remove(user);
        } else {
            item.getVotes().add(user);
        }
        
        return mapToResponse(watchlistItemRepository.save(item), user);
    }

    @Transactional
    public WatchlistItemResponse markAsWatched(String userEmail, Long itemId) {
        User user = getUserByEmail(userEmail);
        WatchlistItem item = getWatchlistItem(itemId);
        
        if (!item.getAddedBy().equals(user)) {
            throw new IllegalStateException("User not authorized to mark this item as watched");
        }
        
        item.setWatchedAt(LocalDateTime.now());
        return mapToResponse(watchlistItemRepository.save(item), user);
    }

    public WatchlistItemResponse getRandomItem(String userEmail) {
        User user = getUserByEmail(userEmail);
        var unwatchedItems = watchlistItemRepository.findTopUnwatchedByVotes(Pageable.unpaged());
        
        if (unwatchedItems.isEmpty()) {
            throw new EntityNotFoundException("No unwatched items found");
        }
        
        Random random = new Random();
        WatchlistItem randomItem = unwatchedItems.get(random.nextInt(unwatchedItems.size()));
        return mapToResponse(randomItem, user);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    private WatchlistItem getWatchlistItem(Long itemId) {
        return watchlistItemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Watchlist item not found"));
    }

    private WatchlistItemResponse mapToResponse(WatchlistItem item, User currentUser) {
        return WatchlistItemResponse.builder()
                .id(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .posterUrl(item.getPosterUrl())
                .type(item.getType())
                .year(item.getYear())
                .genre(item.getGenre())
                .rating(item.getRating())
                .runtime(item.getRuntime())
                .addedByEmail(item.getAddedBy().getEmail())
                .voteCount(item.getVotes().size())
                .hasUserVoted(item.getVotes().contains(currentUser))
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .watchedAt(item.getWatchedAt())
                .build();
    }
}
