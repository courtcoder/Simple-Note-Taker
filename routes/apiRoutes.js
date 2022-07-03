// Accessing server data
const router = require("express").Router();
const db = require("../db");

// Ability to get notes
router.get("/notes", (req, res) => {
  db.readAllNotes().then((notes) => {
    return res.json(notes);
  });
});

//Ability to post notes
router.post("/notes", (req, res) => {
  db.writeNotes(req.body).then((notes) => {
    return res.json(notes);
  });
});

// Ability to delete notes
router.delete("/notes/:id", (req, res) => {
  db.deleteNotes(req.params.id).then(() => {
    return res.json({ ok: true });
  });
});

//exports module
module.exports = router;
