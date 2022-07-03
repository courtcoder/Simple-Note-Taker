//Variables to make unique id's for created notes
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readAsync("db/db.json", "utf8");
  }

  readAllNotes() {
    return this.read().then((data) => {
      let allNotes;
      try {
        allNotes = [].concat(JSON.parse(data));
      } catch (err) {
        allNotes = [];
      }
      return allNotes;
    });
  }

  write(data) {
    return writeAsync("db/db.json", JSON.stringify(data));
  }

  //Writes new notes
  writeNotes(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      id: uuidv4(),
    };
    return this.readAllNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes));
  }

  // deletes notes by id
  deleteNotes(id) {
    // needs to read all the notes, then I need to somehow remove the note that matches the id taht is being passed in, then I need to wite the notes again.
    return this.readAllNotes()
      .then((data) => data.filter((item) => item.id !== id))
      .then((updatedNotes) => this.write(updatedNotes));
  }
}

module.exports = new Notes();
