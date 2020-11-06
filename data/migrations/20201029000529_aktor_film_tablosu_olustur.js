exports.up = function (knex) {
  return knex.schema
    .createTable("aktor", (table) => {
      table.increments(); // id
      table.string("isim").notNullable();
    })
    .createTable("film", (table) => {
      table.increments();
      table.string("isim").notNullable();
    })
    .createTable("aktor_film", (table) => {
      table.increments();
      table.integer("film_id").unsigned();
      table.integer("aktor_id").unsigned();
      table
        .foreign("film_id")
        .references("film.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("aktor_id")
        .references("aktor.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("aktor_film")
    .dropTableIfExists("film")
    .dropTableIfExists("aktor");
};
