const router = require("express").Router();

const Breads = require("../breads/breadsModel.js");

router.get("/", (req, res) => {
  Breads.getAll()
    .then(breads => {
      res.status(200).json(breads);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not get breads." });
    });
});

router.post("/", (req, res) => {
  const bread = req.body;

  Breads.add(bread)
    .then(bread => res.status(200).json(bread))
    .catch(err => {
      res.status(500).json({ error: "Could not post bread." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  Breads.removeById(id)
    .then(bread => res.status(200).json(bread))
    .catch(err =>
      res.status(500).json({ error: "Bread could not be deleted." })
    );
});

module.exports = router;
