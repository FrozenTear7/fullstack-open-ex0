import "./env.mjs";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import Person from "./models/person.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("req-body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  Person.find({}, (err, result) => {
    if (err) res.status(404).json({ error: `Could not fetch persons` });

    res.send(
      `<div>Phonebook has info for ${
        result.length
      } people<br />${new Date().toLocaleString()}</div>`
    );
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}, (err, result) => {
    if (err) res.status(404).json({ error: `Could not fetch persons` });

    res.status(200).json(result);
  });
});

app.post("/api/persons", (req, res) => {
  const { body } = req;

  if (!body || !body.name || !body.number) {
    res.status(404).json({ error: "Please provide valid name and number" });
  } else {
    Person.create({ name: body.name, number: body.number }, (err, result) => {
      if (err) res.status(404).json({ error: `Could not create ${body.name}` });

      res.status(201).json(result);
    });
  }
});

app.get("/api/persons/:id", (req, res) => {
  Person.find({ id: req.params.id }, (err, result) => {
    if (err)
      res
        .status(404)
        .json({ error: `Could not find person with id: ${req.params.id}` });

    res.status(200).json(result);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err)
      res
        .status(404)
        .json({ error: `Could not delete person with id: ${req.params.id}` });

    res.status(204).end();
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
