package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class TvEpisodeRequest {
    private String title;
    private String image;
    private String link;
    private int tvSeriesId;


}
