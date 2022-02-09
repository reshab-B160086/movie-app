// {
//     type : "ADD_MOVIES",
//     movies : []
// }

//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const SHOW_FAVOURITES = "SHOW_FAVOURITES";

//action creators
export function addMovies(movies){
    return {
        type : ADD_MOVIES,
        movies : movies
    }
}

export function addFavourite(movie){
    return {
        type : ADD_FAVOURITE,
        movie : movie
    }
}

export function removeFavourite(movie){
    return {
        type : REMOVE_FAVOURITE,
        movie : movie
    }
}

export function showFavourite(value){
    return {
        type : SHOW_FAVOURITES,
        value
    }
}