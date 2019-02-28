import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux'
import { Redirect } from 'react-router';
class ArtistForm extends Component{
state={
    name:'',
    type: '',
    redirect: false

}

artistChangeFor=(key)=>(event)=>{
    this.setState({
    ...this.state,
    [key]: event.target.value,
    })
}
addArtist=()=>{
    console.log('in Post')
        axios({
            method: 'POST',
            url: '/artist',
            data: this.state
        }).then((response) => {
            
            this.setState({
                redirect: true
            })
           
        });
    }


render(){
console.log(this.state)
    if (this.state.redirect) {
        return <Redirect push to="/" />;
    }



    return(
<div>
    <h2>Input Artist</h2>
            <form onSubmit={this.addArtist}>
                <input onChange={this.artistChangeFor('name')} type="text" placeholder="Who Dis?" />
                <input onChange={this.artistChangeFor('type')} type="text" placeholder="What Do?" />
                
                <br />
                <input type="submit" value="Submit" />
                </form>

</div>





    )
}







}
const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})
export default connect(mapReduxStoreToProps)(ArtistForm);
