import React, {useEffect, useState} from 'react';
import {getAll} from "./Users.service";
import {User} from "./Users.model";
import {
	CircularProgress,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, Typography
} from "@material-ui/core";

const Users: React.FC = () => {
	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		getAll()
			.then(users => setUsers(users));
	}, [])

	console.log(users);
	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>Usuarios</Typography>
			{users === undefined && <CircularProgress/>}
			{users && (
				<TableContainer component={Paper}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell align="center">Id</TableCell>
								<TableCell align="center">Name</TableCell>
								<TableCell align="center">Active</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.Id}>
									<TableCell align="center">{user.Id}</TableCell>
									<TableCell align="center">{user.Name}</TableCell>
									<TableCell align="center">{user.Active}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};

export default Users;
