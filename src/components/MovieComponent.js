import React from 'react'
import Client from './';

class MovieComponent extends React.Component {

    constructor(){
        this.state = {
            genres:[]
        }
    }
    componentDidMount(){
        Client.getUsers().then((response)=> {
            this.setState({genres: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1> User List</h1>
                <tbody>
                    {
                        this.state.genres.map(
                            genres =>
                            <tr key = {genres.id}>
                                <td> {genres.id}</td>
                                <td> {genres.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </div>
        )
    }

}

export default MovieComponent