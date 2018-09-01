import React, {
    Component
} from 'react';

import { MovieKeyMap } from './MovieKeyMap.js';
// Component styles
require('./movieList.scss');

/**
 * Represents MovieListing container
 * @class
 */
class MovieListing extends Component {
    constructor() {
        super();
        // Initial state
        this.state = {}
    }

    render() {
        return (
            <li className="movie-list">
                <div className="movie-title">{this.props.movieInfo['movie_title']}</div>
                <div className="movie-details">
                    {
                        Object.entries(this.props.movieInfo).map(
                            ([key, value], index) => {
                                return MovieKeyMap[key] && value &&
                                    (<div key={index}>
                                        <label>{MovieKeyMap[key]}:</label>
                                        {key == 'plot_keywords' || key == 'genres' ?
                                            <label>{value.split('|').join(', ')}</label> :
                                            key == 'movie_imdb_link' ?
                                                <label>
                                                    <a href="{value}">{value}</a>
                                                </label> :
                                                <label>{value}</label>
                                        }
                                    </div>)
                            }
                        )
                    }
                </div>
            </li>
        );
    }
}

export default MovieListing;