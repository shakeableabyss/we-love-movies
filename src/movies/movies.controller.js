const service = require("./movies.service.js");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);
  if (movie !== undefined) {
	res.locals.movie = movie;
    return next();
  }
  return res.status(404).json({ error: `Movie cannot be found.` });
}

async function read(req, res, next) {
  const { movieId } = req.params;
  const data = await service.read(movieId);
  res.json({ data });
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  const data = await service.list(isShowing);
  res.json({ data });
}

async function getTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await service.getTheaters(movieId);
  res.json({ data });
}

async function notFound(req, res, next) {
  return res.status(404).json({ error: `Path does not exist.` });
}

async function getReviews(req, res, next) {
	const { movieId } = req.params;
	let dataReviews = await service.getReviews(movieId);
	let data = [];
	for (let i = 0; i < dataReviews.length; i++) {
		const thisCritic = dataReviews[i].critic_id;
		let dataCritic = await service.getCritic(thisCritic)
		data.push({...dataReviews[i], "critic": dataCritic[0]})
	}
	res.json({data});
}

module.exports = {
  read: [movieExists, 
		 read],
  list,
  getTheaters,
  getReviews,
  notFound
};
