import { ADD_FAVOURITE, ADD_MOVIES, REMOVE_FAVOURITE, SHOW_FAVOURITES } from '../actions';

const initialMovieState = {
    list : [],
    favourites : [],
    showFavourites : false
}
export function movies(state = initialMovieState, action){

    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list : action.movies
    //     }
    // }
    // return state;

    switch( action.type ){
        case ADD_MOVIES :
            return {
                     ...state,
                     list : action.movies
                 }
        case ADD_FAVOURITE :
            return {
                ... state,
                favourites : [action.movie, ...state.favourites]
            }
        case REMOVE_FAVOURITE :
            const newFavourite = state.favourites.filter((movie)=>{
                return movie.Title !== action.movie.Title
            });
            return {
                ...state,
                favourites : newFavourite
            }
        case SHOW_FAVOURITES :
            return {
                ...state,
                showFavourites : action.value
            }
        default:
            return state;
    }
}

const initialSearchState = {
    result : {}
};
export function search(state = initialSearchState, action){
    return state;
}

const initialRootState = {
    movies : initialMovieState,
    search : initialSearchState
};
export default function rootReducer(state = initialRootState, action){
    return {
        movies : movies(state.movies, action),
        search : search(state.search, action)
    }
}

