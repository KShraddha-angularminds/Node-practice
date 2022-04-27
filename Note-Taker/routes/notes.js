const router = require("express").Router();
const Note = require("../models/notes");
const { noteValidation } = require("../validation");
const verify = require("./verifyToken");

router.post("/addnote", async (req, res) => {
  //validate notes
  const { error } = noteValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    category: req.body.category,
  });
  try {
    const savedNotes = await note.save();
    res.send(savedNotes);
  } catch (err) {
    res.send({ message: err });
  }
});

//get Notes
router.get("/", verify, async (req, res) => {
  try {
    const note = await Note.find();
    res.json(note);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete Note
router.delete("/:noteId", async (req, res) => {
  try {
    const removeNote = await Note.deleteOne({ _id: req.params.noteId });
    res.json(removeNote);
  } catch (err) {
    res.json({ message: err });
  }
});

//update Notes
router.patch("/:noteId", async (req, res) => {
  try {
    const updateNote = await Note.updateOne(
      { _id: req.params.noteId },
      { $set: { title: req.body.title } }
    );
    res.json(updateNote);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
