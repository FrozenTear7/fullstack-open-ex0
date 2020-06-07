import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.mjs <password> to get all records or node mongo.mjs <password> <name> <number> to add a record"
  );
  process.exit(1);
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://admin:${password}@phonebook-y84e2.mongodb.net/phonebook?retryWrites=true&w=majority`;

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  if (process.argv.length === 3) {
    console.log("Phonebook:");

    Person.find({}).then((persons) => {
      persons.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
  } else if (process.argv.length === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });

    person.save().then((result) => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    });
  }
}
