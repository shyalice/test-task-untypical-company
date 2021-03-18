
import {createStore, applyMiddleware, compose} from "redux";
import {createLogger} from 'redux-logger';
import rootReducer from "./rootReducer";

const logger = createLogger();
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(logger));
const store = createStore(rootReducer, initialState, enhancers);

export default store;