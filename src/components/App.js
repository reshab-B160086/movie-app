import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../actions';
import {showFavourite} from '../actions';
import {StoreContext} from '../index';

class App extends React.Component {

  componentDidMount(){

      const { store } = this.props;

      store.subscribe(() =>{
        this.forceUpdate();
        console.log(this.props.store.getState())
      })

      store.dispatch(addMovies(data));

      console.log(this.props.store.getState());
  }

  isFavourite(movie){

    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      return true;
    }
    return false;
  }

  onTabChange = (value) =>{
    this.props.store.dispatch(showFavourite(value));
  }

  render(){
      const { movies, search } = this.props.store.getState();
      const {list, favourites, showFavourites} = movies;
      const displayMovies = showFavourites ? favourites : list;

      return (
        <div className="App">
          <Navbar search={search}/>
          <div className = "main">
            <div className= "tabs">
                <div className={`tab ${showFavourites ? '':'active-tabs'}`} onClick={()=>this.onTabChange(false)}>Movies</div>
                <div className={`tab ${showFavourites ? 'active-tabs':''}`} onClick={()=>this.onTabChange(true)}>Favourites</div>
            </div>
            <div className='list'>
              {displayMovies.map( (movie, index) => (
                <MovieCard 
                  movie ={movie} 
                  key ={`movies-${index}`} 
                  dispatch = {this.props.store.dispatch}
                  isFavourite = {this.isFavourite(movie)}
                />
              ))}
            </div>
            {displayMovies.length === 0 ? <div className='no-movies'>No movies to show!!</div> : null}
          </div>
        </div>
      );
    }
}

class AppWrapper extends React.Component{
  render(){
    return <StoreContext.Consumer>
    {(store) => <App store ={store}/>}
  </StoreContext.Consumer>
  }
}

export default AppWrapper;
