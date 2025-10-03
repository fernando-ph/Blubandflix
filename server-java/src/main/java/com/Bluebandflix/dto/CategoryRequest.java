package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class CategoryRequest {
    private final String name;

    public CategoryRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
