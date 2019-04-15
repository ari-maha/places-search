import React from 'react';
import './ProfileCard.css';

export default function(props) {
    const imageData = props.data.picture.data;
    let button = <button className="favorite-button" onClick={() => props.onFavouriteClick(props.data.id)}>Like</button>;
    if (props.data.isFavourite) {
        button = <button className="favorite-button is-active" onClick={() => props.onFavouriteClick(props.data.id)} >Liked</button>;
    }
    return (
        <div className="profile-card">
            <div className="image-holder">
                <img className="image" src={imageData.url} alt={props.data.name} height={imageData.height} width={imageData.width} />
            </div><div className="card-holder">
                Name: {props.data.name}<br />
                Checkins : {props.data.checkins}
            </div>
            {button}
        </div>
    )
}