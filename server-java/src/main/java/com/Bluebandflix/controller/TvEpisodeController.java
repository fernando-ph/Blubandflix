package com.Bluebandflix.controller;

import com.Bluebandflix.models.TvEpisode;
import com.Bluebandflix.service.TvEpisodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/episodes")
public class TvEpisodeController {

    @Autowired
    private TvEpisodeService tvEpisodeService;

    @GetMapping
    public List<TvEpisode> getAllTvEpisodes() {
        return tvEpisodeService.getAllTvEpisodes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TvEpisode> getTvEpisodeById(@PathVariable Integer id) {
        return tvEpisodeService.getTvEpisodeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TvEpisode> createTvEpisode(@RequestBody TvEpisode tvEpisode) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tvEpisodeService.createTvEpisode(tvEpisode));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TvEpisode> updateTvEpisode(@PathVariable Integer id, @RequestBody TvEpisode tvEpisodeDetails) {
        return ResponseEntity.ok(tvEpisodeService.updateTvEpisode(id, tvEpisodeDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTvEpisode(@PathVariable Integer id) {
        tvEpisodeService.deleteTvEpisode(id);
        return ResponseEntity.noContent().build();
    }
}
