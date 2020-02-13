import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from "react-router-redux";
import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';
import routerHistoryMiddleware from '../navigation/routerMiddleware';

const loggerMiddleware = createLogger();

export const history = createHistory();
export const store = configureStore(history);

export function configureStore(history) {
    const middleware = routerHistoryMiddleware(history);
    const reeduxMiddleware = routerMiddleware(history);
	return createStore(
		rootReducer,
		compose(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware,
                middleware,
                reeduxMiddleware
            )
       )
	);
}
