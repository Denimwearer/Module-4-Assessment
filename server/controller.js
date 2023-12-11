const fortunes = [];
let globalId = 6;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const starterFortunes = [
      "You will achieve great success in your endeavors.",
      "A pleasant surprise is in store for you today.",
      "Your hard work will pay off soon.",
      "Embrace new opportunities that come your way.",
      "Good fortune will follow you wherever you go.",
    ];

    const randomIndex = Math.floor(Math.random() * starterFortunes.length);
    const randomFortune = starterFortunes[randomIndex];

    const newFortune = {
      id: randomIndex,
      text: randomFortune,
    };

    fortunes.push(newFortune);

    res.status(200).send(newFortune);
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
    const id = +req.params.id;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Text is required for updating fortune." });
    }

    const index = fortunes.findIndex((elem) => elem.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Fortune not found." });
    }

    fortunes[index].text = text;

    res
      .status(200)
      .json({ message: "Fortune updated successfully.", fortunes });
  },
};
