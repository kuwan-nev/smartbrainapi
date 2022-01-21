const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '283ae568eccf4cf096bb53ad7abe4d05'
});

const handleAPI = (req, res) => {
	app.models.predict(
	Clarifai.FACE_DETECT_MODEL,
	req.body.input
	)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Error returning API call'))
}

const handleImage = (req, res, db)=> {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json("Error accessing entry count"))
}

module.exports = {
	handleImage,
	handleAPI
}