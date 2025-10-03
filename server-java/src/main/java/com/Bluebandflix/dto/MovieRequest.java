package com.Bluebandflix.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MovieRequest {
    private String genre;
    private String director;
    private List<String> cast;
    private Double rating;
    private String imageUrl;
    private String trailerUrl;
}
