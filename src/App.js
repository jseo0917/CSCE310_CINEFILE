import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import PlayTrailer from './components/PlayTrailer';
import "react-input-range/lib/css/index.css";
import ReactModal from 'react-modal';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import './App.css';
import InputRange from 'react-input-range';
import Client from './Client';
//import MovieComponent from './components/MovieComponent';
import axios from "axios"
import useFetch from "react-fetch-hook"
      
library.add(fab);
//const [data3, setData3] = useState([]);
const apiKey = "165b688bd880d774d14d9bcbaadc7666";
var details = [];
var get_genre = [];
function App() {
  
  let [movieList, setMovieList] = useState(null);
  let [nowPlaying, setNowPlaying] = useState(false);
  let [nowRated, setNowRated] = useState(false);
  let [nowKeyword, setNowKeyword] = useState(false);
  let [page, setPage] = useState(1);
  let [keyword, setKeyword] = useState('');
  let [genre, setGenre] = useState([]);
  let [modalOpen, setOpen] = useState(false);
  let [movieId, setMovieId] = useState(null);
  let [videoId, setVideo] = useState(null);
  let [rating, setRating] = useState(1);
  let [currentList, setCurrent] = useState(null);
  let [reviews, setReview] = useState([]);
  let [getCredits, setCredits] = useState(null);
  let [release_dates, setRelease] = useState(null);
  let [startSearch, setStartSearch] = useState(0);

  let [actors, setactors] = useState([]);
  let [SearchResult, setSearchResult] = useState([]);

  var tmp4 = [];
  let searchContent = '';
  let [tmp2, settmp2] = useState([]);
  let [tmp3, settmp3] = useState([]);
  const getGenre = async() => {
    let local_url = `http://localhost:8080/genres`;

    fetch(local_url)
    .then(resp => resp.json())
    .then(data => setGenre([...data]));
    getNowPlaying();
  }
  
  const getNowPlaying = async() => {

    // let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    // let data = await fetch (url);
    // let result = await data.json();
    // console.log("Movie", result);
    // setMovieList([...result.results]);
    // setCurrent([...result.results]);

    let local_url = `http://localhost:8080/movies/topRated/maxResults/1000`;
    fetch(local_url)
    .then(resp => resp.json())
    .then(data => setMovieList(data)             
    );    
    
    fetch(local_url)
    .then(resp => resp.json())
    .then(data => setCurrent(data)             
    );

    setNowPlaying(true);
    setNowKeyword(false);
    setNowRated(false);
  }
  const getKeyword = async(keyword) => {
    console.log(keyword);
    var tmp3 = [];
    setStartSearch(1);

    fetch(`http://localhost:8080/movies/searchByTitle/${keyword}`)
    .then(resp => resp.json())
    .then(data =>              
      data.map((item)=>{         
      tmp3 = tmp3.concat(item);
      console.log(tmp3);    
      setSearchResult(tmp3)})            
  );

    fetch(`http://localhost:8080/movies/searchByTitle/${keyword}`)
      .then(resp => resp.json())
      .then(data =>         
        setMovieList(data)
     
    );
        
    document.getElementById("keyword").value = null;
    setNowPlaying(false);
    setNowKeyword(true);
    setNowRated(false);
    setKeyword(keyword);

  }

  function filterMovieRating(x) {
    console.log(rating);
    console.log(currentList); 
    if (currentList.length>0) {
      movieList = currentList;
      let temp = movieList.filter((item) => {
        let y = (item.vote_average>=x);
        console.log(y);
        return (y);
      })
      setMovieList(temp);
    }
  }

  const getTopRated = async() => {   
    let local_url = `http://localhost:8080/movies/topRated/maxResults/15`;
    fetch(local_url)
    .then(resp => resp.json())
    .then(data => setMovieList(data)             
    );    
    setNowPlaying(false);
    setNowKeyword(false);
    setNowRated(true);    
  }

  // let getSeeMore = async(page) => {    
  //   if (page === 0) return;
  //   let url;
  //   if (nowPlaying) {
  //     url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  //   } 
  //   else if (nowKeyword) {
  //     url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${keyword}&page=${page}&include_adult=false`;
  //   }
  //   else if (nowRated) {
  //     url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
  //   }
  //   try {
  //     let data = await fetch (url);
  //     let result = await data.json();
  //     setMovieList([...result.results]);
  //     setPage(page);
  //     console.log(`Now Playing ${nowPlaying}, Now Rated ${nowRated}, Now Keyword ${nowKeyword}`)
  //     console.log(url);
  //     setCurrent([...result.results]);
  //   } catch (error) {
  //     alert("Not found!")
  //   }
  // }

  let sortMovieGenre = (currentGenre) => {
    try {
      let temp = movieList.filter((movie) => {
        let x = movie.genre_ids.includes(currentGenre);
        console.log(x);
      return x;
      })
      if (temp.length === 0) return;
      setMovieList(temp);
    } catch (error) {
      alert(error);
    }
    
  }

  let closeModal = () => {
    setOpen(false);
  }

  let openModal = (id) => {
    setOpen(true);
    setMovieId(id);
  }
  
  let getMovieInfo = async() => { 
    var id = ""
    if (SearchResult){        
        {SearchResult.map((item) => {
            id = item.id;
       })}           
    }    
    var tmp3 = [];
    fetch(`http://localhost:8080/movies/${id}/actors`)
      .then(resp => resp.json())
      .then(data => data.map((item)=> {            
            //console.log(item.id);
            //settmp2(item);    
            tmp2 = item;
            //console.log(tmp2);         
            tmp3 = tmp3.concat(tmp2);
            setactors(tmp3);             
    }));

    fetch(`http://localhost:8080/movies/${id}/reviews`)
    .then(resp => resp.json())
    .then(data => 
          setReview(data));
    
  }

  useEffect(() => {
    getGenre();
  }, [])
  if (movieList === null) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    
    <div>

      {/* TOP NAVIGATION BAR */}
      <Navbar className="navbar-color" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">CineFile</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">     

            <Nav.Link href="#toprated" onClick={() => getTopRated()}>Top Rated</Nav.Link>    

            <NavDropdown title="Genres" id="basic-nav-dropdown">
              {genre.map((item) => {
                return(
                <NavDropdown.Item key={item.id} onClick={() => sortMovieGenre(item.id)}>{item.name}</NavDropdown.Item>
                );
              })}
            </NavDropdown>
          
          </Nav>

          <Form inline>
            <FormControl id="keyword" onChange={field => {searchContent = field.target.value;}} type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="dark" onClick={() => getKeyword(searchContent)}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar> 

      <form className="form">
        <InputRange
          draggableTrack
          step={1}
          maxValue={10}
          minValue={1}
          value={rating}
          onChange={value => setRating(value)}
          onChangeComplete={() => filterMovieRating(rating)} className="input-range"/>
      </form>

      <Container>
        <MovieList movieList = {movieList} genreList = {genre} Search = {startSearch} Modal={openModal}/>        
        <ReactModal isOpen={modalOpen} ariaHideApp={false} onAfterOpen={() => getMovieInfo()} closeTimeoutMS={1000}>
          <PlayTrailer close={closeModal} review={reviews} actor = {actors} SearchResults = {SearchResult}></PlayTrailer>
        </ReactModal>
      </Container>
      
      {/* <Container className="seemore">
        <Button variant="dark" className="m-3 mb-5" onClick={() => getSeeMore(page-1)}>Previous</Button>
        <Button variant="dark" className="m-3 mb-5" onClick={() => getSeeMore(page+1)}>Next</Button>
      </Container> */}
    </div>
  );
}

export default App;
