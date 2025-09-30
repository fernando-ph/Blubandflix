package com.Bluebandflix.controller;

import com.Bluebandflix.models.TvSeries;
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
    public List<TvSeries> getAllTvSeries() {
        return tvSeriesService.getAllTvSeries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TvSeries> getTvSeriesById(@PathVariable Integer id) {
        return tvSeriesService.getTvSeriesById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TvSeries> createTvSeries(@RequestBody TvSeries tvSeries) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tvSeriesService.createTvSeries(tvSeries));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TvSeries> updateTvSeries(@PathVariable Integer id, @RequestBody TvSeries tvSeriesDetails) {
        return ResponseEntity.ok(tvSeriesService.updateTvSeries(id, tvSeriesDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTvSeries(@PathVariable Integer id) {
        tvSeriesService.deleteTvSeries(id);
        return ResponseEntity.noContent().build();
    }
}
