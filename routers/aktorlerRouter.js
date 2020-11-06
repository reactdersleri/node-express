const router = require("express").Router();
const Aktor = require("../data/data-model");

router.get("/", (req, res, next) => {
  Aktor.findAktor()
    .then((aktorler) => {
      res.status(200).json(aktorler);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktorler alinirken hata olustu.",
        error,
      });
    });
});

router.post("/", (req, res, next) => {
  const yeniAktor = req.body;

  if (!yeniAktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor eklemek icin isim girmelisiniz.",
    });
  } else {
    Aktor.addAktor(yeniAktor)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Aktor eklerken hata olustu.",
          error,
        });
      });
  }
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedAktor = req.body;

  if (!updatedAktor.isim) {
    next({
      statusCode: 400,
      errorMessage: "Aktor ismi bos olamaz.",
    });
  } else {
    Aktor.updateAktor(updatedAktor, id)
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Aktor duzenlenirken hata olustu.",
          error,
        });
      });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Aktor.findAktorById(id)
    .then((silinecekAktor) => {
      Aktor.deleteAktor(id)
        .then((deleted) => {
          if (deleted) {
            res.status(204).end();
          }
          next({
            statusCode: 400,
            errorMessage: "Silmeye calistiginiz aktor sistemde mevcut degil.",
          });
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: "Aktor silinirken hata olustu.",
            error,
          });
        });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktor bulunurken hata olustu.",
        error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Aktor.findAktorById(id)
    .then((aktor) => {
      if (aktor) {
        res.status(200).json(aktor);
      } else {
        next({
          statusCode: 400,
          erorMessage: "Aktor bulunamadi.",
        });
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktor bulunurken hata olustu.",
        error,
      });
    });
});

module.exports = router;
