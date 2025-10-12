package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class TvEpisodeResponse {
    private int id;
    private String title;
    private String image;
    private String link;
    private Long tvseries;


}
