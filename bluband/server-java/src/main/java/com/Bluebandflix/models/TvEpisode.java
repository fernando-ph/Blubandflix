package com.Bluebandflix.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "episodes")
public class TvEpisode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String title;

    @Column()
    private String image;

    @Column()
    private String link;

   
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tv_id", nullable = false)
    private TvSeries tvseries;

    public Object getTitle() {
        return title;
    }

    public void setTitle(Object title) {
        this.title = (String) title;
    }

    public Object getImage() {
        return image;
    }

    public void setImage(Object image) {
        this.image = (String) image;
    }

    public Object getLink() {
        return link;
    }

    public void setLink(Object link) {
        this.link = (String) link;
    }

    public TvSeries getTvseries() {
        return tvseries;
    }

    public void setTvseries(TvSeries tvseries) {
        this.tvseries = tvseries;
    }

    public void setSeries(TvSeries tvseries) {
    }
}
