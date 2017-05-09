import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

import Manage from 'Containers/Manage';
import User from 'Containers/Manage/User';
import UserEdit from 'Containers/Manage/User/Edit';
import Content from 'Containers/Manage/Content';
import ContentEdit from 'Containers/Manage/Content/Edit';

import rootReducer from 'Reducers';

import './index.styl';

const middlewares = [thunk, routerMiddleware(browserHistory)];

const store = createStore(
    combineReducers({
        ...rootReducer,
        routing: routerReducer,
    }),
    {},
    applyMiddleware(...middlewares),
);

const history = syncHistoryWithStore(browserHistory, store);

const App = () =>
    (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Manage}>
                    <IndexRoute component={User} />
                    <Route path="/user/edit" component={UserEdit} />
                    <Route path="/content" component={Content} />
                    <Route path="/content/edit" component={ContentEdit} />
                </Route>
            </Router>
        </Provider>
    );

export default App;
