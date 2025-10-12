package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class TvSeriesResponse {
    private Long id;
    private String title;
    private String image;
    private String year;
    private Long categoryId;
    private String categoryName;
    private String description;
    private String link;


}
