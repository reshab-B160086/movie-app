import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../actions';
import {showFavourite} from '../actions';
import {connect, StoreContext} from '../index';

class App extends React.Component {

  componentDidMount(){
      this.props.dispatch(addMovies(data));
      console.log(this.props);
  }

  isFavourite(movie){

    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      return true;
    }
    return false;
  }

  onTabChange = (value) =>{
    this.props.dispatch(showFavourite(value));
  }

  render(){
      const { movies, search } = this.props;
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
                  dispatch = {this.props.dispatch}
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

// class AppWrapper extends React.Component{
//   render(){
//     return <StoreContext.Consumer>
//     {(store) => <App store ={store}/>}
//   </StoreContext.Consumer>
//   }
// }

function mapStateToProps(state){
  return {
    movies : state.movies,
    search : state.search
  }
}

const connectedAppComponent = connect(mapStateToProps
)(App);

export default connectedAppComponent;
