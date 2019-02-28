// ArtistList.js
import axios from 'axios';
import React, { Component } from 'react';
import ArtistListItem from '../ArtistListItem/ArtistListItem';
import { connect } from 'react-redux'

class ArtistList extends Component {
   
    componentDidMount() { // react Component method
        this.refreshArtists();
    }
    refreshArtists = () => {
        // just like $.ajax()
        axios({
            method: 'GET',
            url: '/artist'
        }).then((response) => {
            console.log(response);
            // response.data will be the array of artists
            this.props.dispatch({ type: 'SET_ARTISTS', payload: response.data })
        });
    }
        
   

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.props.reduxStore.artistReducer.map(artist => (<ArtistListItem key={artist.name} refreshArtists={this.props.refreshArtists} artist={artist} />))}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})
export default connect(mapReduxStoreToProps)(ArtistList);