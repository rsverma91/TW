import React, {
    Component
} from 'react';

// Component styles
require('./movieListing.scss');

// Components
import MovieList from './MovieList/MovieList.jsx';

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
            <div className="moive-listing">
                {
                    this.props.isFetchingMovie ?
                        (<div>We are loading movies for you</div>) :
                        (<ul>
                            {this.props.movieToDisplay.map((movies, index) => {
                                return <MovieList key={index} movieInfo={movies} />
                            })}
                        </ul>)
                }
            </div>
        );
    }
}

export default MovieListing;