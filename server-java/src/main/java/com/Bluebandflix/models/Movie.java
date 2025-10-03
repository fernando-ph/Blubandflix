package com.Bluebandflix.models;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String image;

    @Column(length = 255)
    private String year;

    // Relasi ke Category
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(length = 255)
    private String description;

    @Column(length = 255)
    private String link;

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

    public Object getLink() {
        return link;
    }

    public void setLink(Object link) {
        this.link = (String) link;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}