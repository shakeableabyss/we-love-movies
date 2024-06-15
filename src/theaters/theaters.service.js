const knex = require("../db/connection");

function list () {
	return knex("theaters")
		.select("*");
}

function getMovies(theaterId) {
	return knex("movies")
		.join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
		.select("movies.*")
		.where( {"theater_id": theaterId,
				 "movies_theaters.is_showing": true} )
}

module.exports = {
  list,
  getMovies
};