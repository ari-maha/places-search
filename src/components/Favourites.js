import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import './Search';
import { 
    getFavoriteList, removeFromLocalStorage
} from '../helpers/LocalStoragehelper';

class Favourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeList : getFavoriteList()
        }
    }

    getProfiles(dataArray) {
        return dataArray.map(data => {
            return <ProfileCard data={data} key={data.id} onFavouriteClick={this.handleFavouriteButtonClick} />
        });
    }

    handleFavouriteButtonClick = (id) => {
        removeFromLocalStorage(id);
        this.setState({
            placeList : getFavoriteList()
        })
    }

    render() {
        return (
            <div className="content-holder">
                { this.getProfiles(this.state.placeList) }
            </div>
        );
    }
}

export default Favourites;