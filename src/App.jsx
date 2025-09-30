import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from './components/MovieCard';
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'

const API_BASE_URL = '/api';
const API_KEY = 'b470537f';



function App() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  //this function doesnt run everytime the user types only after they stop typing for a short delay 
  // or we can make it if he pressed enter 
  const [movieList, setMovieList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])
  //use effect second argument is the dependency array so always [] because i list variable that if changed rerun 
  // so if i have [a, b, c] → run effect if a, b, or c change. {} would be an object not an array 
  //clearTimeout = “Cancel the previous wait if the user typed something new.” 34an msh kol mara astana el 500 ms
  // law el user katab kaza haga 
  //this is how debouncing works — preventing spammy updates.



  const fetchMovies = async (query = '') => {
    console.log("fetching movies for:", query)
    setIsLoading(true)
    setErrorMessage('')

    try {
      if (query) {
        // search for specific movie
        //url = `${API_BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
        //const response = await fetch(url);
        //or
        const response = await fetch(`${API_BASE_URL}/?s=${query}&apikey=${API_KEY}`)
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();

        if (data.Response === 'False') {

          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovieList([]);
          return;
        }
        setMovieList(data.Search || []);
      } else {
        const popularTitles = ['Avengers', 'Batman', 'Spider-Man', 'Star Wars', 'Harry Potter'];
        const randomTitle = popularTitles[Math.floor(Math.random() * popularTitles.length)];

        const url = `${API_BASE_URL}/?s=${randomTitle}&apikey=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();

        if (data.Response === 'False') {
          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovieList([]);
          return;
        }

        setMovieList(data.Search || []);


      }
    } catch (error) {
      console.error(`Fetch Error: ${error}`)
      setErrorMessage(`failed to fetch movies: ${error.message}`)
      setMovieList([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const popularTitles = ['Inception', 'The Dark Knight', 'Interstellar', 'The Godfather'];
      const trendingData = [];
      for (let i = 0; i < 4; i++) {
        const title = popularTitles[i];
        const response = await fetch(`${API_BASE_URL}/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
        //encodeURIComponent("Harry Potter & Goblet of Fire")
        // "Harry%20Potter%20%26%20Goblet%20of%20Fire"

        const data = await response.json();

        if (data.Response === 'True') {
          trendingData.push({
            $id: data.imdbID,
            title: data.Title,
            poster_url: data.Poster !== 'N/A' ? data.Poster : '/no-movie.png'
          });
        }
      }
      setTrendingMovies(trendingData);

    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingMovies([]);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

  //load default movies when app runs 
  useEffect(() => {
    loadTrendingMovies();
  }, [])



  //simulae api delay
  //   setTimeout(() => {
  //     if (query) {
  //       setMovieList([
  //         `${query} Movie 1`,
  //         `${query} Movie 2`,
  //         `${query} Movie 3`
  //       ])
  //     } else {
  //       setMovieList([
  //         'popular movie 1',
  //         'popular Movie 2',
  //         'Movie 3'
  //       ])
  //     }
  //     setIsLoading(false)
  //   }, 1000)
  // }
  // useEffect(() => {
  //   fetchMovies(searchTerm)
  // }, [searchTerm])




  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies && trendingMovies.length > 0 && (
          // this means if trending movies exists and not null  and has more htan 0 items then sjow trending screen otherwise nothing
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>

                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}

            </ul>
            //movieList.map(...) = "For each movie, create a MovieCard"
            //MovieCard = Your custom component that shows movie info beautifully
            //movie={movie} = Pass the movie data to the MovieCard component

          )}
        </section>
      </div>
    </main>
  )
}
{/* <h1>my movie app</h1>
      <p>Search: "{searchTerm}"</p>
      <p>Movies: {movieList.length}</p>
      <p>loading: {isLoading ? 'true' : 'false'}</p>
      <h1>Count: {count}</h1>
      <h2>Name: {name}</h2> */}

{/* <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name" />
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Type here' />
      {/* so iam currently setting the the search term with the onchange event what is haga ana baktebha
e; hpwa hena e.target value  */}
{/* <button onClick={() => setIsLoading(!isLoading)}>toggle loading</button>
      <button onClick={(e) => setSearchTerm('')}>clear</button>  */}

{/* <h1> Real Movie search</h1>
      <input value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        placeholder="search movies nigga"
      />

      <h2>Results:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <li key={movie.imdbID}>
              <strong>{movie.Title} </strong>({movie.Year})
            </li>
          ))}
        </ul>
        // // movieElements now contains:
        // [
        //   <li key={0}>Batman Movie 1</li>,
        //   <li key={1}>Batman Movie 2</li>, 
        //   <li key={2}>Batman Movie 3</li>
        // ]
      )} */}
{/* .map() goes through each number and doubles it */ }



//okay so the main function must return sth 
//use state like sth that react watches when it changes react redraws wthe componenet
//useState - Lets us store and change data
//useEffect - Lets us do things when the component loads
//like do sth when i click  
export default App