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

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.get("/api/info", (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.send(
        `<div>Phonebook has info for ${
          result.length
        } people<br />${new Date().toLocaleString()}</div>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { body } = req;

  Person.create({ name: body.name, number: body.number })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { body } = req;
  console.log(body);

  Person.findByIdAndUpdate(
    req.params.id,
    { $set: { name: body.name, number: body.number } },
    { runValidators: true, context: "query" }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  return next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
