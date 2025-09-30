package com.Bluebandflix.service;

import com.Bluebandflix.models.TvSeries;
import com.Bluebandflix.repository.TvSeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TvSeriesService {

    @Autowired
    private TvSeriesRepository tvSeriesRepository;

    public List<TvSeries> getAllTvSeries() {
        return tvSeriesRepository.findAll();
    }

    public Optional<TvSeries> getTvSeriesById(Integer id) {
        return tvSeriesRepository.findById(id);
    }

    public TvSeries createTvSeries(TvSeries tvSeries) {
        return tvSeriesRepository.save(tvSeries);
    }

    public TvSeries updateTvSeries(Integer id, TvSeries tvSeriesDetails) {
        TvSeries tvSeries = tvSeriesRepository.findById(id).orElseThrow(() -> new RuntimeException("TvSeries not found"));
        tvSeries.setTitle(tvSeriesDetails.getTitle());
        tvSeries.setDescription(tvSeriesDetails.getDescription());
        tvSeries.setImage(tvSeriesDetails.getImage());
        tvSeries.setYear(tvSeriesDetails.getYear());
        tvSeries.setCategory(tvSeriesDetails.getCategory());
        return tvSeriesRepository.save(tvSeries);
    }

    public void deleteTvSeries(Integer id) {
        tvSeriesRepository.deleteById(id);
    }
}
