package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class TvEpisodeResponse {
    private int id;
    private String title;
    private String image;
    private String link;
    private TvSeriesResponse tvseries;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public TvSeriesResponse getTvseries() {
        return tvseries;
    }

    public void setTvseries(TvSeriesResponse tvseries) {
        this.tvseries = tvseries;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
