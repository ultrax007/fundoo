import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducers";
import logger from "redux-logger";

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
