import {API} from 'aws-amplify';
import {User} from "./Users.model";

export const getAll = () => {
	return new Promise<User[]>((resolve, reject) => {
		API.get('api', `/users`, {})
			.then((result) => {
				resolve(result as User[]);
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}
