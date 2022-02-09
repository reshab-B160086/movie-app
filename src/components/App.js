import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../actions';
import {showFavourite} from '../actions';

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

    const { favourites } = this.props.store.getState();

    const index = favourites.indexOf(movie);

    if(index !== -1){
      return true;
    }
    return false;
  }

  onTabChange = (value) =>{
    this.props.store.dispatch(showFavourite(value));
  }

  render(){
      const {list, favourites, showFavourites} = this.props.store.getState();
      const displayMovies = showFavourites ? favourites : list;
      return (
        <div className="App">
          <Navbar />
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

export default App;
