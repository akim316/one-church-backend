import { version } from '../../package.json';
import { Router } from 'express';
import churches from './churches';
import profile from './profile';

export default ({ config, db }) => {
	let api = Router();

	// mount the churches resource
	api.use('/churches', churches({ config, db }));

	api.use('/profile', profile({config, db}));
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
