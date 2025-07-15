package com.drewerskine.sharedwatchlist.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WatchlistItemRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    private String posterUrl;
    
    @NotBlank(message = "Type is required")
    private String type;
    
    @NotNull(message = "Year is required")
    private Integer year;
    
    private String genre;
    private Double rating;
    private Integer runtime;
}
