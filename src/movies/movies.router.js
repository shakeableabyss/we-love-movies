const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());

router.route("/")
	.get(controller.list)
	.all(methodNotAllowed);

router.route("/:movieId")
	.get(controller.read)
	.all(methodNotAllowed);

router.route("/:movieId/theaters")
	.get(controller.getTheaters)

router.route("/:movieId/reviews")
	.get(controller.getReviews)

router.route("/:movieId/critics")
	.all(controller.notFound)

module.exports = router;