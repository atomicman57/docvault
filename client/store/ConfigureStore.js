import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const ConfigureStore = (initialState => createStore(
         rootReducer,
         initialState,
         compose(
           applyMiddleware(thunk),
         window.devToolsExtension ? window.devToolsExtension() : f => f))
     );
export default ConfigureStore;
