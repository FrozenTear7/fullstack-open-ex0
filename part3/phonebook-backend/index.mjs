import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());

morgan.token("req-body", function(req, res) {
    return JSON.stringify(req.body);
});
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :req-body"
    )
);

const generateId = () => {
    return Math.floor(Math.random() * 100000);
};

let persons = [{
        name: "Arto Hellas",
        number: "123123",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
];

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
    res.send(
        `<div>Phonebook has info for ${
      persons.length
    } people<br />${new Date().toLocaleString()}</div>`
    );
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (!body || !body.name || !body.number) {
        res.status(404).json({ error: "Please provide valid name and number" });
    } else if (persons.find((person) => person.name === body.name)) {
        res.status(404).json({ error: "Name must be unique" });
    } else {
        const newPerson = {
            id: generateId(),
            name: body.name,
            number: body.number,
        };
        persons = [...persons, newPerson];

        res.status(201).json(newPerson);
    }
});

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find((person) => person.id === req.params.id);

    if (person) {
        res.status(200).json(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    persons = persons.filter((person) => person.id !== +req.params.id);

    res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});