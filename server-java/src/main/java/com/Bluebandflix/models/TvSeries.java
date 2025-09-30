package com.Bluebandflix.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tvs")
public class TvSeries { @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;

    @Column(nullable = false)
    private String title;

    @Column()
    private String image;

    @Column()
    private String year;

    // Relasi ke Category
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column()
    private String description;

    @Column()
    private String link;

    public TvSeries(String link) {
        this.link = link;
    }

    public Object getTitle() {
        return title;
    }

    public void setTitle(Object title) {
        this.title = (String) title;
    }

    public Object getDescription() {
        return description;
    }

    public void setDescription(Object description) {
        this.description = (String) description;
    }

    public Object getImage() {
        return image;
    }

    public void setImage(Object image) {
        this.image = (String) image;
    }

    public Object getYear() {
        return year;
    }

    public void setYear(Object year) {
        this.year = (String) year;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}