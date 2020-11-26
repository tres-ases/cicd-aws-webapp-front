import React from 'react';
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import SignIn from "./views/SignIn";
import Amplify, {Auth} from 'aws-amplify';
import Users from "./views/Users";

Amplify.configure({
	Auth: {
		userPoolId: process.env.REACT_APP_USER_POOL_ID,
		region: process.env.REACT_APP_REGION,
		userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
	},
	API: {
		endpoints: [
			{
				name: 'api',
				endpoint: '/api',
				custom_header: async () => {
					try {
						return {
							Authorization: `${(await Auth.currentSession())
								.getIdToken()
								.getJwtToken()}`,
						};
					} catch (e) {
						return {};
					}
				},
			},
		],
	},
});

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/signin' component={SignIn}/>
				<Route exact path='/users' component={Users}/>
				<Redirect from="*" to="/signin"/>
			</Switch>
		</Router>
	);
}

export default App;
