import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom'

import reducer from './reducer';
import './config';
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/anthroute'
import Dashboard from './component/dashboard/dashboard'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'


const store = createStore(reducer,compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<AuthRoute></AuthRoute>
					<Switch>
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						{/* <Redirect from='/' to='/login'></Redirect> */}
						<Route component={Dashboard}></Route>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
);


