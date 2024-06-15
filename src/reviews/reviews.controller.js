const service = require("./reviews.service.js");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);

  if (review !== undefined) {
	res.locals.review = review;
    return next();
  }

  return res.status(404).json({ error: `Review cannot be found.` });
}

async function update(req, res) {
  const updatedReview = {
	  ...res.locals.review,
	  ...req.body.data,
	  review_id: res.locals.review.review_id,
  };
	let dataCritic = await service.getCritic(updatedReview);
	let dataReview = await service.update(updatedReview);
	dataReview = dataReview[0];
	dataCritic = dataCritic[0];
	const data = {...dataReview,
				 "critic": dataCritic}
	res.json({ data });
}

async function destroy(req, res) {
  const {review} = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
		update: [reviewExists,
				 update],
		delete: [reviewExists, 
				 destroy],
}