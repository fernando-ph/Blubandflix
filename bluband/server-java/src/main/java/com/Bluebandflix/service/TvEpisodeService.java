package com.Bluebandflix.service;

import com.Bluebandflix.models.TvEpisode;
import com.Bluebandflix.repository.TvEpisodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TvEpisodeService {

    @Autowired
    private TvEpisodeRepository tvEpisodeRepository;

    public List<TvEpisode> getAllTvEpisodes() {
        return tvEpisodeRepository.findAll();
    }

    public Optional<TvEpisode> getTvEpisodeById(Integer id) {
        return tvEpisodeRepository.findById(id);
    }

    public TvEpisode createTvEpisode(TvEpisode tvEpisode) {
        return tvEpisodeRepository.save(tvEpisode);
    }

    public TvEpisode updateTvEpisode(Integer id, TvEpisode tvEpisodeDetails) {
        TvEpisode tvEpisode = tvEpisodeRepository.findById(id).orElseThrow(() -> new RuntimeException("TvEpisode not found"));
        tvEpisode.setTitle(tvEpisodeDetails.getTitle());
        tvEpisode.setImage(tvEpisodeDetails.getImage());
        tvEpisode.setLink(tvEpisodeDetails.getLink());
        tvEpisode.setSeries(tvEpisodeDetails.getTvseries());
        return tvEpisodeRepository.save(tvEpisode);
    }

    public void deleteTvEpisode(Integer id) {
        tvEpisodeRepository.deleteById(id);
    }
}
