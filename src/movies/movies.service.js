const knex = require("../db/connection");

function list(isShowing) {
	if(isShowing === "true") {
		return knex("movies as m")
		  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		  .select("m.movie_id")
		  .where( {is_showing: true})
		  .distinct("m.movie_id");
  }	
  return knex("movies").select("*");
}

function read(movieId) {
	return knex("movies")
		.select("*")
		.where( {movie_id: movieId})
		.first();
}

function getTheaters(movieId) {
  return knex("movies_theaters")
    .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*")
    .where({ movie_id: movieId });
}

function getReviews(movieId)
{
	return knex("reviews")
		.select("*")
		.where({ movie_id: movieId });
}

function getCritic(criticId)
{
	return knex("critics")
		.select("*")
		.where({ critic_id: criticId })
}


module.exports = {
  list,
  read,
  getReviews,
  getCritic,
  getTheaters
};