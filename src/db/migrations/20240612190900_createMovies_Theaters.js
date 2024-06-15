
exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters",(table) => {
		table
		  .integer("movie_id")
		  .unsigned()
		  .notNullable()
		  .references("movie_id") 
		  .inTable("movies")
		  .onDelete("cascade");
		table
		  .integer("theater_id")
		  .unsigned()
		  .notNullable()
		  .references("theater_id")
		  .inTable("theaters")
		  .onDelete("cascade");
        table.boolean("is_showing");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters");
};
