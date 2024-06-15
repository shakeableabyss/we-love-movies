
exports.up = function(knex) {
    return knex.schema.createTable("reviews",(table) => {
        table.increments("review_id").primary();
        table.text("content");
        table.integer("score");
        /*
		table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade");
        table
            .foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("cascade");
			*/
    table
      .integer("movie_id")
      .unsigned()
      .notNullable()
      .references("id") // Reference the correct column name
      .inTable("movies")
      .onDelete("cascade");
    table
      .integer("critic_id")
      .unsigned()
      .notNullable()
      .references("critic_id")
      .inTable("critics")
      .onDelete("cascade");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};


/*

review_id: (Primary Key) A unique ID for the review.
content: (Text) The content of the review, written in markdown.
score: (Integer) A numerical representation of the score given to the movie by the critic.
critic_id: (Foreign Key) A reference ID to a particular critic.
movie_id: (Foreign Key) A reference ID to a particular movie.
An example record looks like the following:

{
  "review_id": 1,
  "content": "...",
  "score": 4,
  "movie_id": 1,
  "critic_id": 4,
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}

*/