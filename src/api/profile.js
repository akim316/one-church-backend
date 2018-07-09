import resource from 'resource-router-middleware';
import facets from '../models/facets';
import _ from 'lodash';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'profile',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let facet = facets.find( facet => facet.id===id ),
			err = facet ? null : 'Not found';
		callback(err, facet);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		const churches = db.db("onechurch").collection("churches");
		churches.find({}).toArray((err, result) => {
			if (err) res.json({'error': err});
			res.json(result);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		//body.id = facets.length.toString(36);
		const profile = db.db("onechurch").collection("profiles");
		let obj = _.pick(body, ['firstName', 'lastName', 'city', 'state', 'zip']);
		obj.date = new Date();
		profile.insertOne(obj);
		res.json(obj);
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		facets.splice(facets.indexOf(facet), 1);
		res.sendStatus(204);
	}
});