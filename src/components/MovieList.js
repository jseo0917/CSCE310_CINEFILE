import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';

library.add(faStar);

export default function MovieList(props) {
    //console.log(JSON.stringify(props));
    //console.log(props.movieList);
    let content = [];
    let temp = [];
    function formatMovie() {
        props.movieList.forEach((item, i) => {
            temp.push(item);
            if ((i+1) % 3 === 0) {
                content.push(temp);
                temp = [];
            }
        })
        if (!(temp === [])) {
            content.push(temp);
        }
    }

    formatMovie();
    return (
        <div>
            <Container fluid="md">
                {content.map((item, index) => {
                    return (
                        <Row key={index} className="m-5">
                            {item.map(movie => {
                                let genreMovie = "";
                                if (props){
                                    let genreMovie = movie.genre_ids;
                                }
                                else{
                                    let genreMovie = movie.genre_id;
                                }
                                let genreTotal = [];
                                //console.log(genreMovie);
                                genreTotal = props.genreList.filter((x) => genreMovie.includes(x.id))
                                if (genreTotal.length === 0) {
                                    genreTotal.push({name: "Unidentified :("});
                                }
                                //console.log(movie);
                                let description = movie.overview.split(" ").slice(0, 15);
                                //console.log(description);
                                //console.log(genreTotal);
                                return (
                                    <Col className="d-flex" key={movie.id} sm="4">
                                        <Card className="flex-fill" bg="light" text="dark" border="dark" style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
                                            <Card.Body>
                                                <Card.Title>{movie.original_title}</Card.Title>
                                                <ListGroup variant="flush">
  
                                                    <ListGroup.Item>
                                                        <span style={{float: "bottom"}}>
                                                            <span text-align="left"><FontAwesomeIcon icon="star"/>{movie.vote_average}</span>
                                                            <span style={{float: "right"}}>{movie.release_date.split("-")[0]}</span>
                                                        </span>
                                                    </ListGroup.Item>                       
                                                    <ListGroup.Item>
                                                        <Card.Link href="#" onClick={() => props.Modal(movie.id)}>Get Movie Information</Card.Link>                                                        
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })}
            </Container>
        </div>
    )
}
