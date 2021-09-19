import {useState, useEffect,} from 'react';

// API
import API from '../API';
// Helpers
import { isPersistedState } from '../helpers';

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState( {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    
    const  fetchMovies = async(movieId) => {
        try {
           
            setError(false);
            setLoading(true);
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // Get directors only
            const directors = credits.crew.filter(
             member => member.job === 'Director'
            );

            setState({
                ...movie,
                actors: credits.cast,
                directors,
                credits
            });
            setError(false);
            setLoading(false);
        } catch(error) {
            setError(true);
            setLoading(false);
        }

        const sessionState = isPersistedState(movieId);

        if (sessionState) {
          setState(sessionState);
          setLoading(false);
          return;
        }

    }

    // initial & search
    useEffect(() => {
        setState({});
        fetchMovies(movieId);
    }, [movieId])

    // Write to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);



    return {state, loading, error};
}

export default useMovieFetch;