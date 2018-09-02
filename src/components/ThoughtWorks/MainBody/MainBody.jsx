import React, {
    Component
} from 'react';

// Components
import ActionBlock from './ActionBlock/ActionBlock.jsx';
import MovieListing from './MovieListing/MovieListing.jsx';

/**
 * Represents MainBody container
 * @class
 */
class MainBody extends Component {
    constructor() {
        super();
        this.state = {
            movieToDisplay: []
        }
        this.onMovieSelect = this.onMovieSelect.bind(this);
        this.setFilteredMovies = this.setFilteredMovies.bind(this);
        this.setSortedMovies = this.setSortedMovies.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            movieToDisplay: newProps.movieData
        });
    }
    onMovieSelect(title) {
        let filteredMovies = [];
        if (title) {
            let regex = new RegExp(title.toLowerCase());
            filteredMovies = this.props.movieData.filter(movies =>
                regex.test(movies.movie_title.toLowerCase())
            );
        }
        this.setState({
            movieToDisplay: filteredMovies
        });
    }
    setFilteredMovies(filteredMovies) {
        this.setState({
            movieToDisplay: filteredMovies
        });
    }
    setSortedMovies(sortedMovies) {
        this.setState({
            movieToDisplay: sortedMovies
        });
    }
    render() {
        return (
            <div className="main-body">
                <ActionBlock setSortedMovies={this.setSortedMovies} setFilteredMovies={this.setFilteredMovies} filters={this.props.filters} isFetchingMovie={this.props.isFetchingMovie} onMovieSelect={this.onMovieSelect} movieData={this.props.movieData} />
                <MovieListing movieToDisplay={this.state.movieToDisplay} isFetchingMovie={this.props.isFetchingMovie} />
            </div>
        );
    }
}
export default MainBody;