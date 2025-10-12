package com.Bluebandflix.controller;

import com.Bluebandflix.dto.TvSeriesRequest;
import com.Bluebandflix.dto.TvSeriesResponse;
import com.Bluebandflix.service.TvSeriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/series")
public class TvSeriesController {

    @Autowired
    private TvSeriesService tvSeriesService;

    @GetMapping
    public ResponseEntity<List<TvSeriesResponse>> getAllTvSeries() {
        List<TvSeriesResponse> tvSeries = tvSeriesService.getAllTvSeries();
        return ResponseEntity.ok(tvSeries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TvSeriesResponse> getTvSeriesById(@PathVariable Long id) {
        return tvSeriesService.getTvSeriesById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TvSeriesResponse> createTvSeries(@RequestBody TvSeriesRequest tvSeriesRequest) {
        TvSeriesResponse createdTvSeries = tvSeriesService.createTvSeries(tvSeriesRequest);
        return new ResponseEntity<>(createdTvSeries, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TvSeriesResponse> updateTvSeries(@PathVariable Long id, @RequestBody TvSeriesRequest tvSeriesRequest) {
        TvSeriesResponse updatedTvSeries = tvSeriesService.updateTvSeries(id, tvSeriesRequest);
        return ResponseEntity.ok(updatedTvSeries);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTvSeries(@PathVariable Long id) {
        tvSeriesService.deleteTvSeries(id);
        return ResponseEntity.noContent().build();
    }
}
