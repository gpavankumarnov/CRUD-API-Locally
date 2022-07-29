//loading a express module
const express = require("express");

//As it returns a function, stored in app.
const app = express();

app.use(express.json());

const genres = [
  {
    id: 1,
    movieName: "Annabelle",
  },
  {
    id: 2,
    movieName: "Conjuring",
  },
  {
    id: 3,
    movieName: "Kanchana",
  },
  {
    id: 4,
    movieName: "Inception",
  },
  {
    id: 5,
    movieName: "NoTimeToDie",
  },
  {
    id: 6,
    movieName: "Tenet",
  },
  {
    id: 7,
    movieName: "Interstellar",
  },
  {
    id: 8,
    movieName: "Anthariksham",
  },
  {
    id: 9,
    movieName: "Gravity",
  },
];

//GET
app.get("/", (req, res) => {
  res.send("Welcome to BookMyShow App Backened Service");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("No movie existed with the passed ID");
  }
  res.send(genre);
});

//POST
app.post("/api/genres", (req, res) => {
  const newGenre = {
    id: genres.length + 1,
    movieName: req.body.movieName,
  };
  if (newGenre.movieName === "" || newGenre.movieName.length < 3) {
    return res
      .status(400)
      .send("the movieName shouldn't be empty & not be less than 3characters");
  }
  genres.push(newGenre);
  res.send(newGenre);
});

//PUT
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((e) => e.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(404).send("doesn't found the genre");
  }
  if (req.body.movieName === "") {
    return res.status(404).send("genre movieName shouldn't be empty");
  }

  genre.movieName = req.body.movieName;
  res.send(genre);
});

//DELETE
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((e) => e.id === parseInt(req.params.id));
  console.log(genre);
  if (!genre) {
    return res.status(404).send("doesn't found the genre");
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

//Listening the http requests
app.listen(3000, console.log("listening on 3000.... port"));
