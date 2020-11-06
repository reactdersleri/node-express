exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("aktor")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("aktor").insert([
        { id: 1, isim: "Kemal Sunal" },
        { id: 2, isim: "Sener Sen" },
        { id: 3, isim: "Adile Nasit" },
      ]);
    });
};
