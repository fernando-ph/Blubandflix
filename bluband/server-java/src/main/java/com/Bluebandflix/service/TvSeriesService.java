package com.Bluebandflix.service;

import com.Bluebandflix.dto.TvSeriesRequest;
import com.Bluebandflix.dto.TvSeriesResponse;
import com.Bluebandflix.models.Category;
import com.Bluebandflix.models.TvSeries;
import com.Bluebandflix.repository.CategoryRepository;
import com.Bluebandflix.repository.TvSeriesRepository;
import com.Bluebandflix.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TvSeriesService {
    @Autowired
    private TvSeriesRepository tvSeriesRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<TvSeriesResponse> getAllTvSeries() {
        return tvSeriesRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<TvSeriesResponse> getTvSeriesById(Long id) {
        return tvSeriesRepository.findById(id)
                .map(this::convertToDto);
    }

    @Transactional
    public TvSeriesResponse createTvSeries(TvSeriesRequest tvSeriesRequest) {
        TvSeries tvSeries = convertToEntity(tvSeriesRequest);
        TvSeries savedTvSeries = tvSeriesRepository.save(tvSeries);
        return convertToDto(savedTvSeries);
    }

    @Transactional
    public TvSeriesResponse updateTvSeries(Long id, TvSeriesRequest tvSeriesRequest) {
        TvSeries tvSeries = tvSeriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TvSeries not found with ID: " + id));

        tvSeries.setTitle(tvSeriesRequest.getTitle());
        tvSeries.setDescription(tvSeriesRequest.getDescription());
        tvSeries.setImage(tvSeriesRequest.getImage());
        tvSeries.setYear(tvSeriesRequest.getYear());
        tvSeries.setLink(tvSeriesRequest.getLink());

        if (tvSeriesRequest.getCategoryId() == null || tvSeriesRequest.getCategoryId() <= 0) {
            throw new IllegalArgumentException("Category ID must not be null or less than or equal to zero.");
        }
        Category category = categoryRepository.findById(tvSeriesRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + tvSeriesRequest.getCategoryId()));
        tvSeries.setCategory(category);

        TvSeries updatedTvSeries = tvSeriesRepository.save(tvSeries);
        return convertToDto(updatedTvSeries);
    }

    @Transactional
    public void deleteTvSeries(Long id) {
        tvSeriesRepository.deleteById(id);
    }

    private TvSeriesResponse convertToDto(TvSeries tvSeries) {
        TvSeriesResponse tvSeriesResponse = new TvSeriesResponse();
        tvSeriesResponse.setId(tvSeries.getId());
        tvSeriesResponse.setTitle(tvSeries.getTitle());
        tvSeriesResponse.setImage(tvSeries.getImage());
        tvSeriesResponse.setYear(tvSeries.getYear());
        tvSeriesResponse.setDescription(tvSeries.getDescription());
        tvSeriesResponse.setLink(tvSeries.getLink());

        if (tvSeries.getCategory() != null) {
            tvSeriesResponse.setCategoryId(tvSeries.getCategory().getId());
            tvSeriesResponse.setCategoryName(tvSeries.getCategory().getName());
        }

        return tvSeriesResponse;
    }

    private TvSeries convertToEntity(TvSeriesRequest tvSeriesRequest) {
        TvSeries tvSeries = new TvSeries();
        tvSeries.setTitle(tvSeriesRequest.getTitle());
        tvSeries.setImage(tvSeriesRequest.getImage());
        tvSeries.setYear(tvSeriesRequest.getYear());
        tvSeries.setDescription(tvSeriesRequest.getDescription());
        tvSeries.setLink(tvSeriesRequest.getLink());

        if (tvSeriesRequest.getCategoryId() == null || tvSeriesRequest.getCategoryId() <= 0) {
            throw new IllegalArgumentException("Category ID must not be null or less than or equal to zero.");
        }
        Category category = categoryRepository.findById(tvSeriesRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + tvSeriesRequest.getCategoryId()));
        tvSeries.setCategory(category);

        return tvSeries;
    }
}
