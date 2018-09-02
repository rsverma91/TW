import React, {
    Component
} from 'react';

// Component styles
require('./thoughtWorks.scss');

// Actions
import {
    fetchMovies
} from './thoughtWorks.actions.js';

// Components
import Header from './Header/Header.jsx';
import MainBody from './MainBody/MainBody.jsx';
import Footer from './Footer/Footer.jsx';

/**
 * Represents ThoughtWorks container
 * @class
 */
class ThoughtWorks extends Component {
    constructor() {
        super();
        this.state = {
            movieData: [],
            isFetchingMovie: true,
            filters: {}
        }
    }
    componentDidMount() {
        fetchMovies(movieData => {
            
            // default sory by year
            movieData.sort((a, b) => {
                return Number(b.title_year) - Number(a.title_year)
            })

            // Filter Item object
            const generFilter = {}, plotFilter = {}, langFilter = {}, countryFilter = {};
            movieData.map(movies => {
                if (movies.genres) {
                    movies.genres.split('|').map(item => {
                        generFilter[item] ? generFilter[item]++ : generFilter[item] = 1;
                    });
                }
                if (movies.plot_keywords) {
                    movies.plot_keywords.split('|').map(item => {
                        plotFilter[item] ? plotFilter[item]++ : plotFilter[item] = 1;
                    });
                }
                if (movies.language) {
                    langFilter[movies.language] ? langFilter[movies.language]++ : langFilter[movies.language] = 1;
                }
                if (movies.country) {
                    countryFilter[movies.country] ? countryFilter[movies.country]++ : countryFilter[movies.country] = 1;
                }
            });
            this.setState({
                movieData,
                isFetchingMovie: false,
                filters: {
                    generFilter,
                    plotFilter,
                    langFilter,
                    countryFilter
                }
            })
        })
    }
    render() {
        return (
            <div className="tw">
                <Header />
                <MainBody filters={this.state.filters} isFetchingMovie={this.state.isFetchingMovie} movieData={this.state.movieData} />
                <Footer />
            </div>
        );
    }
}
export default ThoughtWorks;