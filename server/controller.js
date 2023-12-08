const fortunes = require("./db.json");
let globalId = 7;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
    console.log(randomFortune);
  },

  createFortune: (req, res) => {
    const { text } = req.body;

    let newFortune = {
      id: globalId,
      text,
    };
    fortunes.push(newFortune);
    globalId++;
    res.status(200).send(fortunes);
  },

  deleteFortune: (req, res) => {
    let index = fortunes.findIndex((elem) => elem.id === +req.params.id);
    if (index === -1) {
      res.status(400).send("Can't delete");
      return;
    }

    fortunes.splice(index, 1);
    res.status(200).send(fortunes);
    return;
  },

  updateFortune: (req, res) => {
    const { text } = req.body;
    let index = fortunes.findIndex((elem) => elem.id === +req.params.id);

    let editFortune = {
      text,
    };

    fortunes.push(editFortune);
    console.log(editFortune);
    res.status(200).send(fortunes);

    if (index === -1) {
      res.status(400).send("Can not find fortune");
      return;
    }
  },
};
