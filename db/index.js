// util and v4: uuid to make unique ids for notes fs to write files
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//asynch to control flow, ex. once saved, then populate
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes {
  //reading JSON in db.json
  read() {
    return readAsync("db/db.json", "utf8");
  }

  readAllNotes() {
    return this.read().then((data) => {
      let allNotes;
      try {
        allNotes = [].concat(JSON.parse(data)); // read whats in data base (JSON) and turn into array
      } catch (err) {
        allNotes = [];
      }
      return allNotes;
    });
  }

  write(data) {
    // writing task list to db.json with new data set
    return writeAsync("db/db.json", JSON.stringify(data));
  }

  writeNotes(note) {
    const newNote = {
      title: note.title, //note.title is the assigned title and all properties make a new object called newNote
      text: note.text,
      id: uuidv4(),
    };
    return this.readAllNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes));
  }

  // needs to read all the notes, then remove the note that matches the id that is being passed in, then wite the notes again.
  deleteNotes(id) {
    return this.readAllNotes()
      .then((data) => data.filter((item) => item.id !== id))
      .then((updatedNotes) => this.write(updatedNotes));
  }
}

module.exports = new Notes();
