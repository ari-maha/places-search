import React from 'react';
import { Link } from "react-router-dom";

export default function(props) {
    var style = {
        link : {
            margin : '0 5px',
            display : 'inline-block'
        },
        header : {
            marginBottom : '10px'
        }
    }
    return (
        <nav style={style.header}>
            <div style={style.link}>
                <Link to="/">Search</Link>
            </div>
            <div style={style.link}>
                <Link to="/fav/">Favourites</Link>
            </div>
        </nav>
    )
}