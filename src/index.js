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

