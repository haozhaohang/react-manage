import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

import LayoutMain from 'Containers/LayoutMain';
import User from 'Containers/User';
import UserEdit from 'Containers/User/Edit';
import Label from 'Containers/Label';
import LabelEdit from 'Containers/Label/Edit';
import Content from 'Containers/Content';
import ContentEdit from 'Containers/Content/Edit';

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
                <Route path="/" component={LayoutMain}>
                    <IndexRoute component={User} />
                    <Route path="/user/edit" component={UserEdit} />
                    <Route path="/label" component={Label} />
                    <Route path="/label/edit" component={LabelEdit} />
                    <Route path="/content" component={Content} />
                    <Route path="/content/edit" component={ContentEdit} />
                </Route>
            </Router>
        </Provider>
    );

export default App;
