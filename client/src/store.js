import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};//초기상태값

const middlewares = [sagaMiddleware, routerMiddleware(history)];//향후 미들웨어 추가
const devtools = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_;//크롬에서 개발상태 보여줌

const composeEnhancer = 
    process.env.NODE_ENV === "production" ? compose : devtools || compose; 
//배포단계에선 개발자 도구를 안보이게 해야하기 때문에 3항 연산자로 작성함.

const store = createStore(
    createRootReducer(history),
    initialState, //웹의 모든 상태를 담는 초기값/값을 찾을때 store에서 
    composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);//sagaMiddleware를 작동해주세요..

export default store;