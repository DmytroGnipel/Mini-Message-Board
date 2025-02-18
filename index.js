import path from "path";
const __dirname = import.meta.dirname;
import express from "express";
const index = express();
index.set("views", path.join(__dirname, "views"));
index.set("view engine", "ejs");

let id_urlCounter = 2;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    href: 1,
    age: 42,
    location: "Paris",
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    href: 2,
    age: 23,
    location: "Barcelona",
  },
];

function getDetails(href) {
  let string = "";
  messages.forEach((message) => {
    if (message.href == href) {
      string =
        string +
        `Author name: ${message.user},
        message: ${message.text}, added: ${message.added},
        user's ID: ${message.href}, age: ${message.age},
        location: ${message.location}
        `;
    }
  });
  if (string) return string;
  else return false;
}

index.use(express.urlencoded({ extended: true }));

index.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

index.get("/new", (req, res) => {
  res.render("form");
});

index.get("/:href", (req, res) => {
  const message = getDetails(req.params.href);
  message ? res.send(message) : res.redirect("/");
});

index.post("/new", (req, res) => {
  const { authorname, messageText, age, location } = req.body;
  messages.push({
    text: messageText,
    user: authorname,
    added: new Date(),
    href: ++id_urlCounter,
    age: age,
    location: location,
  });
  res.redirect("/");
});

index.listen(10000, () => console.log("i am running"));
