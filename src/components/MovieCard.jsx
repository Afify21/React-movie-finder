import React from 'react'

const MovieCard = ({ movie:
  { Title, Year, Poster, Type, imdbID }
}) => {
  return (
    <div className="movie-card">
      <img
        src={Poster && Poster !== 'N/A' ? Poster : '/no-movie.png'}
        alt={Title}
      />

      <div className="mt-4">
        <h3>{Title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>IMDB</p>
          </div>

          <span>•</span>
          <p className="lang">{Type}</p>

          <span>•</span>
          <p className="year">
            {Year || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
