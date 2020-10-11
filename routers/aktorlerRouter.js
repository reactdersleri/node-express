const router = require("express").Router();
let data = require("../data.js");

router.get("/", (req, res) => {
  res.status(200).json(data);
});

let next_id = 4;

router.post("/", (req, res, next) => {
  let yeni_aktor = req.body;

  if (!yeni_aktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor eklemek icin isim girmelisiniz.",
    });
  } else if (yeni_aktor.isim && !yeni_aktor.filmler) {
    next({
      statusCode: 400,
      errorMessage: "Aktor eklemek icin filmler girmelisiniz.",
    });
  } else {
    yeni_aktor.id = next_id;
    next_id++;
    data.push(yeni_aktor);
    res.status(201).json(yeni_aktor);
  }
});

router.delete("/:id", (req, res) => {
  const silinecek_aktor_id = req.params.id;
  const silinecek_aktor = data.find(
    (aktor) => aktor.id === Number(silinecek_aktor_id)
  );

  if (silinecek_aktor) {
    data = data.filter((aktor) => aktor.id !== Number(silinecek_aktor_id));
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ errorMessage: "Silmeye calistiginiz aktor sistemde yok." });
  }
});

// PUT
// id req.params'dan al
// duzenlenen aktor degerini req.body al
// dizi icinde id ile aktor var mi?
// aktor sistemde varsa, bilgileri degistir, 200 koduyla yeni aktor bilgilerini gonder
// 404 koduyla hata gonder

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const aktor = data.find((aktor) => aktor.id === parseInt(id));
  if (aktor) {
    res.status(200).json(aktor);
  } else {
    res.status(404).send("Aradiginiz aktor bulunamadi...");
  }
});

module.exports = router;
