import { combineReducers } from 'redux';
import { ADD_FAVOURITE, ADD_MOVIES, REMOVE_FAVOURITE, SHOW_FAVOURITES, ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT } from '../actions';

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
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list],
            };
        default:
            return state;
    }
}

const initialSearchState = {
    results: {},
    showSearchResults: false,
};
export function search(state = initialSearchState, action) {
    switch (action.type) {
      case ADD_SEARCH_RESULT:
        return {
          ...state,
          results: action.movie,
          showSearchResults: true,
        };
      case ADD_MOVIE_TO_LIST:
        return {
          ...state,
          showSearchResults: false,
        };
      default:
        return state;
    }
  }

// const initialRootState = {
//     movies : initialMovieState,
//     search : initialSearchState
// };
// export default function rootReducer(state = initialRootState, action){
//     return {
//         movies : movies(state.movies, action),
//         search : search(state.search, action)
//     }
// }

export default combineReducers({
    movies : movies,
    search : search
});

