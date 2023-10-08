import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from 'redux';
import watchSaga from './sagas';
import reducer from "./reducers"; 

const middleWare = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(middleWare));

middleWare.run(watchSaga);
export default store;