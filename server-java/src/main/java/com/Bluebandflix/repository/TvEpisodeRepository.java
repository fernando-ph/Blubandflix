package com.Bluebandflix.repository;

import com.Bluebandflix.models.TvEpisode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TvEpisodeRepository extends JpaRepository<TvEpisode,Integer> {
}
