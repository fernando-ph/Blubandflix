package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class MovieRequest {
    private String title;
    private String image;
    private String year;
    private Long category_id; // Changed to category_id for relationship
    private String description;
    private String link;
}
