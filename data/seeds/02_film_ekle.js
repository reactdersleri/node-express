exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("film")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("film").insert([
        { id: 1, isim: "Tosun Pasa" },
        { id: 2, isim: "Banker Bilo" },
        { id: 3, isim: "Neseli Gunler" },
      ]);
    });
};
