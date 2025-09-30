package com.Bluebandflix.service;

import com.Bluebandflix.models.Category;
import com.Bluebandflix.repository.CategoryRepository;
import com.Bluebandflix.dto.CategoryRequest;
import com.Bluebandflix.dto.CategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CategoryResponse> getCategoryById(Integer id) {
        return categoryRepository.findById(id)
                .map(this::convertToDto);
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        Category savedCategory = categoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public Optional<CategoryResponse> updateCategory(Integer id, CategoryRequest categoryRequest) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setName(categoryRequest.getName());
                    Category updatedCategory = categoryRepository.save(existingCategory);
                    return convertToDto(updatedCategory);
                });
    }

    public boolean deleteCategory(Integer id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CategoryResponse convertToDto(Category category) {
        CategoryResponse dto = new CategoryResponse();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}
