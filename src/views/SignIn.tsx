import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {Button, Container, Grid, TextField,} from '@material-ui/core';

const SignIn: React.FC = () => {
	const [email, setEmail] = useState('');
	const [passwd, setPasswd] = useState('');

	const signIn = () => {
		Auth.signIn(email.toLowerCase(), passwd)
			.then((user) => {
				if (user.challengeName) {
					console.warn('Response not covered!', user.challengeName);
				} else {
					console.log('User authenticated', user);
				}
			})
			.catch((error) => {
				console.error('Error', error);
			});
	};

	return (
		<Container>
			<Grid container direction="column" justify="center" alignItems="center">
				<Grid item>
					<TextField id="email" label="Correo Electrónico" variant="filled"
										 onChange={(event) => {
											 setEmail(event.currentTarget.value ? event.currentTarget.value : '');
										 }}/>
				</Grid>
				<Grid item>
					<TextField id="passwd" label="Contraseña" variant="filled"
										 onChange={(event) => {
											 setPasswd(event.currentTarget.value ? event.currentTarget.value : '');
										 }}/>
				</Grid>
				<Grid item>
					<Button variant="contained" onClick={signIn}>Ingresar</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default SignIn;
