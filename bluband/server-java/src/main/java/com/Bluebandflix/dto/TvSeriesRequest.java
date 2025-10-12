package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class TvSeriesRequest {
    private String title;
    private String image;
    private String year;
    private Long categoryId; // Changed to categoryId for relationship
    private String description;
    private String link;


}
