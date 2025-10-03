package com.Bluebandflix.dto;

import lombok.Data;


@Data
public class MovieResponse {
    private Integer id;
    private String title;
    private String image;
    private String year;
    private CategoryResponse category; // Use CategoryResponse DTO
    private String description;
    private String link;
}
