import React, {
    Component
} from 'react';

// Component styles
require('./actionBlock.scss');

/**
 * Represents ActionBlock container
 * @class
 */
class ActionBlock extends Component {
    constructor() {
        super();

        // Initial state
        this.state = {
            filteredMovies: [],
            isMovieNameVisible: false,
            sortBy: 'year',
            filters: []
        }
        this.appliedFilter = {
            gener: [],
            plot: [],
            lang: [],
            country: []
        };
        this.sortType = {
            year: 'title_year',
            rating: 'content_rating'
        };
        this.onMovieSearch = this.onMovieSearch.bind(this);
        this.onMovieSelect = this.onMovieSelect.bind(this);
        this.sortByType = this.sortByType.bind(this);
    }
    componentDidMount() {
        // const gener={}
        // this.props.movieData.map(movies =>{
        //     if(movies.genres){
        //         movies.genres.split('|').map(item=>{

        //         });
        //     }
        // });
    }
    onMovieSearch(e) {
        let value = e.target.value;
        let filteredMovies = [], isMovieNameVisible = false;
        if (value) {
            let regex = new RegExp(value.toLowerCase());
            filteredMovies = this.props.movieData.filter(movies =>
                regex.test(movies.movie_title.toLowerCase())
            );
            filteredMovies = filteredMovies.slice(0, 6)
            if (filteredMovies.length) {
                isMovieNameVisible = true
            }
        }
        this.setState({
            filteredMovies,
            isMovieNameVisible
        });
    }
    onMovieSelect(e) {
        let title = e.target.getAttribute('data-title');
        this.refs.searchItem.value= title;
        this.setState({
            isMovieNameVisible:false
        })
        this.props.onMovieSelect(title);
    }
    onChkChange(e) {
        let checked = e.target.checked;
        let type = e.target.id.split('_')[0];
        let value = e.target.getAttribute('data-id');
        let indexOfFilter = this.appliedFilter[type].indexOf(value);
        if (checked && indexOfFilter == -1) {
            this.appliedFilter[type].push(value);
        } else {
            if (indexOfFilter >= 0)
                this.appliedFilter[type].splice(indexOfFilter, 1)
        }
        let filteredMovies = this.movieFilter(this.appliedFilter, this.props.movieData);
        this.props.setFilteredMovies(filteredMovies);
    }
    movieFilter(appliedFilter, movies) {
        let _this = this;
        let filteredMovie = movies.filter(movie => {
            let isCountryMatch = false;
            let filterLen = appliedFilter.country.length;
            if (filterLen) {
                if (appliedFilter.country.indexOf(movie['country']) >= 0) {
                    isCountryMatch = true;
                }
            } else {
                isCountryMatch = true;
            }

            let isLang = false;
            filterLen = appliedFilter.lang.length;
            if (filterLen) {
                if (appliedFilter.lang.indexOf(movie['language']) >= 0) {
                    isLang = true;
                }
            } else {
                isLang = true;
            }


            return isCountryMatch && isLang;
        });
        return filteredMovie;
    };
    sortByType(e) {
        let by = e.target.getAttribute('data-type');
        let sortedMovies = this.props.movieData.slice(0);
        sortedMovies.sort((a, b) => {
            return b[this.sortType[by]] - a[this.sortType[by]]
        });
        this.setState({
            sortBy: by
        })
        this.props.setSortedMovies(sortedMovies);
    }
    render() {
        let _this = this;
        return (
            <div className="action-block">
                {
                    !this.props.isFetchingMovie &&
                    <div>
                        <div className="movie-search">
                            <label className="title">SearchMovie</label>
                            <input type="text" ref="searchItem" onKeyUp={this.onMovieSearch} />
                            <div className={this.state.isMovieNameVisible ? 'movie-name-list' : 'movie-name-list hide'}>
                                <ul onClick={this.onMovieSelect}>
                                    {
                                        this.state.filteredMovies.map((item, index) => {
                                            return <li data-title={item.movie_title} key={index}>{item.movie_title}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="sort-movie">
                            <label className="title">Sort By:</label>
                            <ul onClick={this.sortByType}>
                                {Object.entries(this.sortType).map(
                                    ([key, value], index) => {
                                        return <li key={key + '_' + index} className={_this.state.sortBy == key ? 'active' : ''} data-type={key}>{key}</li>
                                    })}
                            </ul>
                        </div>
                        <div className="filter-movie">
                            <label className="title">Filter:</label>
                            {/* <div>
                                <label>Gener</label>
                                <ul onChange={this.onChkChange.bind(this)}>
                                    {Object.entries(this.props.filters.generFilter).map(
                                        ([key, value], index) => {
                                            return <li key={'gener_' + index}>
                                                <div className="checkbox">
                                                    <input type="checkbox" id={"gener_" + key} data-id={key} />
                                                    <label htmlFor={"gener_" + key} className="custom-checkbox">
                                                    </label>
                                                    <label htmlFor={"gener_" + key} className="checkbox-text truncate">{key} ({value})</label>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <label>Plot</label>
                                <ul onChange={this.onChkChange.bind(this)}>
                                    {Object.entries(this.props.filters.plotFilter).map(
                                        ([key, value], index) => {
                                            return <li key={'plot_' + index}>
                                                <div className="checkbox">
                                                    <input type="checkbox" id={"plot_" + key} data-id={key} />
                                                    <label htmlFor={"plot_" + key} className="custom-checkbox">
                                                    </label>
                                                    <label htmlFor={"plot_" + key} className="checkbox-text truncate">{key} ({value})</label>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div> */}
                            <div>
                                <label>Language</label>
                                <ul onChange={this.onChkChange.bind(this)}>
                                    {Object.entries(this.props.filters.langFilter).map(
                                        ([key, value], index) => {
                                            return <li key={'lang_' + index}>
                                                <div className="checkbox">
                                                    <input type="checkbox" id={"lang_" + key} data-id={key} />
                                                    <label htmlFor={"lang_" + key} className="custom-checkbox">
                                                    </label>
                                                    <label htmlFor={"lang_" + key} className="checkbox-text truncate">{key} ({value})</label>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <label>Country</label>
                                <ul onChange={this.onChkChange.bind(this)}>
                                    {Object.entries(this.props.filters.countryFilter).map(
                                        ([key, value], index) => {
                                            return <li key={'country_' + index}>
                                                <div className="checkbox">
                                                    <input type="checkbox" id={"country_" + key} data-id={key} />
                                                    <label htmlFor={"country_" + key} className="custom-checkbox">
                                                    </label>
                                                    <label htmlFor={"country_" + key} className="checkbox-text truncate">{key} ({value})</label>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ActionBlock;