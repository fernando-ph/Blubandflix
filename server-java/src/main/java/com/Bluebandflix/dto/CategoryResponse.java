package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class CategoryResponse {
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
    }
}
