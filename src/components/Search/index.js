import React, { Component } from 'react';
import ProfileCard from '../ProfileCard';
import Loader from 'react-loader-spinner';
import './Search.css';
import { 
    removeFromLocalStorage, 
    setFavoriteToLocalStorage, 
    transformNetworkResponse 
} from '../../helpers/LocalStoragehelper';
import { AppId, SecretId } from '../../helpers/AppDetails';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeList : [],
            showLoader : false,
            next : null,
            stopListening : false
        }
    }
    getApiCall(text) {
        return `https://graph.facebook.com/search?type=place&q=${text}&limit=20&fields=name,checkins,picture&access_token=${AppId}|${SecretId}`;
    }

    handleDebounceState() {
        let timerId = null;
        const that = this;
        return function(event) {
            event.persist();
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(function(){
                that.handleInputChange(event);
            }, 400);
        }
    }

    handleInputChange(event) {
        const searchText = event.target.value;
        if (!searchText || !searchText.trim()) {
            return true;
        }
        this.setState({
            showLoader : true,
            placeList : []
        })
        fetch(this.getApiCall(searchText))
            .then(response => response.json())
            .then(result => {
                this.setState({
                    placeList : transformNetworkResponse(result.data),
                    showLoader : false,
                    next: result.paging ? result.paging.next ? result.paging.next : null : null
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    getNextRecords() {
        if (this.state.next && !this.state.stopListening) {
            this.setState({
                showLoader : true,
                stopListening : true
            })
            fetch(this.state.next)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    placeList : [
                        ...this.state.placeList,
                        ...transformNetworkResponse(result.data)
                    ],
                    showLoader : false,
                    next: result.paging ? result.paging.next ? result.paging.next : null : null,
                    stopListening : false
                })
            })
        }
    }

    handleFavouriteButtonClick = (id) => {
        this.setState({
            placeList : this.state.placeList.map(placeObject => {
                if (placeObject.id === id) {
                    placeObject.isFavourite ? removeFromLocalStorage(id) : setFavoriteToLocalStorage(placeObject);
                    return {
                        ...placeObject,
                        isFavourite : !placeObject.isFavourite
                    }
                }
                return placeObject;
            })
        })
    }

    getProfiles(dataArray) {
        return dataArray.map(data => {
            return <ProfileCard data={data} key={data.id} onFavouriteClick={this.handleFavouriteButtonClick} />
        });
    }

    listenScrollEvent = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.getNextRecords();
        }
    }

    render() {
        return (
            <div className="content-holder">
                <input placeholder="Enter place here" onChange={this.handleDebounceState()}/>
                <div className="place-list" onScroll={this.listenScrollEvent}>
                    { this.getProfiles(this.state.placeList) }
                    { this.state.showLoader && 
                        <div className="loader">
                            <Loader 
                                type="TailSpin"
                                color="#00BFFF"
                                height="50"	
                                width="50"
                            /> 
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Search;