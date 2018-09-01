import axios from 'axios';

/**
 * @function
 * @desc Fetch movies 
 * @param {Function} callback Callback function
 * @returns none
 */
export const fetchMovies = callback => {
    axios.get('http://starlord.hackerearth.com/movieslisting')
        .then(function (response) {
            if (response.data && response.data.length) {
                callback(response.data);
            } else {
                callback([])
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}