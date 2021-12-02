import React from 'react'
import YouTube from '@u-wave/react-youtube';
import './PlayTrailer.css';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { render } from '@testing-library/react';
import axios from "axios"
import { useEffect, useState } from 'react';
//w: 960, h:540

export default function PlayTrailer(props) {
      
    var actor_lists = [];
    var title = "";
    var vt_avg = "";
    var release_date = "";
    var overview = "";
    var language = "";
    var genre = [];
    var poster_path = "";
    var movie_id = "";
    var review = [];

    if (props.actor){        
        {props.actor.map((item) => {
            actor_lists = actor_lists.concat(item.name);
       })}           
    }
    //console.log(props.SearchResults);
    if(props.SearchResults){
        {props.SearchResults.map((item) => {
            movie_id = item.id;
            title = item.title;
            vt_avg = item.vote_average;
            overview = item.overview;
            release_date = item.release_date;
            language = item.original_language;
            genre = item.genre_id;
            poster_path = item.poster_path;
       })}      
    }
        
    if(props.review){
        {props.review.map((item)=> {
            review = review.concat(item.content);
        })}
    }
 
    return (               
        <div>            
            <button className="mb-2" style={{display: "block"}} onClick={() => props.close()}>Close</button>
            <Card.Img variant="top" className="poster"  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`} />
            <h3> Movie Information </h3>
            <h4>Actors: </h4>            
             {actor_lists.map((item) => {                 
                 return (<p style={{display : 'inline'}}>
                    {`${item}, `}
                 </p>);
             })}
             <h4>Title: </h4>
             <p>{title}</p>
             <h4>Language: </h4>
             <p>{language}</p>
             <h4>Release Date: </h4>
             <p>{release_date}</p>
             <h4>Vote Average: </h4>
             <p>{vt_avg}</p>
             <h4>Overview: </h4>
             <p>{overview}</p>
             <h4>Review </h4>
             <ul>
             {review.map((item) => {                 
                 return (<li>
                    ${item}
                 </li>);
             })}
             </ul>           
        </div>
    )
        
}
