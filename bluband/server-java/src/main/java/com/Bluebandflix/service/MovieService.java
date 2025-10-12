package com.Bluebandflix.service;

import com.Bluebandflix.dto.CategoryResponse;
import com.Bluebandflix.dto.MovieRequest;
import com.Bluebandflix.dto.MovieResponse;
import com.Bluebandflix.models.Category;
import com.Bluebandflix.models.Movie;
import com.Bluebandflix.repository.CategoryRepository;
import com.Bluebandflix.repository.MovieRepository;
import com.Bluebandflix.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<MovieResponse> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<MovieResponse> getMovieById(Long id) {
        return movieRepository.findById(id)
                .map(this::convertToDto);
    }

    @Transactional
    public MovieResponse createMovie(MovieRequest movieRequest) {
        Movie movie = convertToEntity(movieRequest);
        Movie savedMovie = movieRepository.save(movie);
        return convertToDto(savedMovie);
    }

    @Transactional
    public MovieResponse updateMovie(Long id, MovieRequest movieRequest) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + id));
        
        // Update movie fields from request
        movie.setTitle(movieRequest.getTitle());
        movie.setDescription(movieRequest.getDescription());
        movie.setImage(movieRequest.getImage());
        movie.setLink(movieRequest.getLink());
        movie.setYear(movieRequest.getYear()); // Added year update

        // Handle category update
        if (movieRequest.getCategory_id() != null && movieRequest.getCategory_id() > 0) {
            Category category = categoryRepository.findById(movieRequest.getCategory_id())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            movie.setCategory(category);
        }
        
        Movie updatedMovie = movieRepository.save(movie);
        return convertToDto(updatedMovie);
    }

    @Transactional
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    private MovieResponse convertToDto(Movie movie) {
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setId(movie.getId());
        movieResponse.setTitle(movie.getTitle());
        movieResponse.setImage(movie.getImage());
        movieResponse.setYear(movie.getYear());
        movieResponse.setDescription(movie.getDescription());
        movieResponse.setLink(movie.getLink());

        if (movie.getCategory() != null) {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setId(movie.getCategory().getId());
            categoryResponse.setName(movie.getCategory().getName());
            movieResponse.setCategory(categoryResponse);
        }
        return movieResponse;
    }

    private Movie convertToEntity(MovieRequest movieRequest) {
        Movie movie = new Movie();
        movie.setTitle(movieRequest.getTitle());
        movie.setImage(movieRequest.getImage());
        movie.setYear(movieRequest.getYear());
        movie.setDescription(movieRequest.getDescription());
        movie.setLink(movieRequest.getLink());

        if (movieRequest.getCategory_id() != null && movieRequest.getCategory_id() > 0) {
            Category category = categoryRepository.findById(movieRequest.getCategory_id())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            movie.setCategory(category);
        }
        return movie;
    }
}
