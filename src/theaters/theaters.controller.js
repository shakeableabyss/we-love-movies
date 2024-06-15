const service = require("./theaters.service.js");

async function list(req, res, next) {
	let dataTheaters = await service.list();
	let data = [];
	for (let i = 0; i < dataTheaters.length; i++) {
		const thisTheater = dataTheaters[i].theater_id;
		let dataMovies = await service.getMovies(thisTheater)
		data.push({...dataTheaters[i], "movies": dataMovies})
	}
	res.json({data});
}

module.exports = {
  list
};