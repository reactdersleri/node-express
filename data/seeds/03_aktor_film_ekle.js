exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("aktor_film")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("aktor_film").insert([
        { film_id: 1, aktor_id: 1 },
        { film_id: 2, aktor_id: 2 },
        { film_id: 3, aktor_id: 3 },
      ]);
    });
};
