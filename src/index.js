import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';


// const logger = function({dispatch, getState}){
//     return function(next){
//       return function (action){
//         console.log("ACTION_TYPE ", action.type);
//         next(action);
//       }
//     }
// }

const logger = ({dispatch, getState}) => (next)=> (action) =>{
  console.log("ACTION_TYPE ", action.type);
  next(action);
}

const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }

  next(action);
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export const StoreContext = createContext();
console.log("store", store);

class Provider extends React.Component{
  render(){
    const {store} = this.props;
    return <StoreContext.Provider value={store}>
              {this.props.children}
           </StoreContext.Provider>;
  }
}

export function connect(callback){
  return function (Component){
    class ConnectedComponent extends React.Component{
      constructor(props){
        super(props);
        this.unSubscribe = this.props.store.subscribe(()=>this.forceUpdate());
      }

      componentWillUnmount(){
        this.unSubscribe();
      }
      render(){
              const {store} = this.props;
              const state = store.getState();
              const dataTobePassedAsProps = callback(state);
              return( 
                  <Component 
                    {...dataTobePassedAsProps} 
                    dispatch = {store.dispatch}
                  />);
        
      }
    }
    class ConnectedComponentWrapper extends  React.Component{
      render(){
        return (<StoreContext.Consumer>
          {(store) => <ConnectedComponent store ={store}/>}
        </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  }
}

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies : [{name :"Superman"}]
// });

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

