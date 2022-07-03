//requiring server and JSON data
const router = require("express").Router();
const db = require("../db");

//routes to server/calling express
router.get("/notes", (req, res) => {
  db.readAllNotes().then((notes) => {
    return res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  db.writeNotes(req.body).then((notes) => {
    return res.json(notes);
  });
});

router.delete("/notes/:id", (req, res) => {
  db.deleteNotes(req.params.id).then(() => {
    return res.json({ ok: true });
  });
});

module.exports = router;
