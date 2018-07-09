import mongo from 'mongodb';

let state = {
	db: null,
};

exports.connect = (done) => {
	if (state.db) return done(state.db);
	let uri = "mongodb+srv://admin:AMR6C5wqSBjkYRB2@cluster0-64ex5.gcp.mongodb.net/test?retryWrites=true";
	let MongoClient = mongo.MongoClient;
	MongoClient.connect(uri, (err, db) => {
		if (err) return done(err);
		state.db = db;
		done(db);
	});
}

exports.get = () => {
	return state.db;
}

exports.close = (done) => {
	if (state.db) {
		state.db.close((err, result) => {
			state.db = null;
			state.mode = null;
			done(result);
		});
	}
}