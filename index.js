//My web blog solution

import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const homeStartingContent = "Castle, medieval stronghold, generally the residence of the king or lord of the territory in which it stands. Strongholds designed with the same functionality have been built throughout the world, including in Japan, India, and other countries. The word castle is sometimes applied to prehistoric earthworks, such as Maiden Castle in England, and is also applied, in various linguistic forms (e.g., château, castello, and Burg), to princely mansions or country seats.";
const aboutContent = "In western Europe the castle developed rapidly from the 9th century. Fortifications built in France in the 10th century often included a high mound encircled by a ditch and surmounted by the leader’s particular stronghold, as in the castles at Blois and Saumur. Later, one or more baileys or wards (grounds between encircling walls) were enclosed at the foot of the mound. During the 11th century this type of private fortress, known as the “motte [mound] and bailey” castle, spread throughout western Europe.";
const contactContent = "The baileys at the foot of the mound were enclosed by palisades and later by walls and towers of masonry. Almost at the same time that the shell keep was being erected in western Europe, the rectangular keep, a more compact form of citadel, was also being built. Examples are the donjon at Loches, France (c. 1020), and the keep at Rochester, England (c. 1130).";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});


app.get("/about", (req, res) => {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});


app.post("/compose", (req, res) => {
    const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    date: new Date(),
  };

  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
        date: new Date(),
      });
    }
  });
});


app.get("/edit/:postName", (req, res) => {
  const edittedTitle = _.lowerCase(req.params.postName)
    posts.forEach((post) => {
      if (edittedTitle === _.lowerCase(post.title)) {
        res.render("edit", {
          title: post.title,
          content: post.content,
          date: new Date(),
      });
    }
  });
});


app.post("/edit/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  let listOfItem = -1;
  posts.forEach((post, index) => {
    if (requestedTitle === _.lowerCase(post.title)) {
      let editData = {
        title: req.body.postTitle,
        content: req.body.postBody,
        date: new Date(),
      };
      listOfItem = index;
      posts.splice(listOfItem, 1, editData);
      res.redirect("/");
    }
  });
});


app.get("/delete/:postName", (req, res) => {
  const deleteTitle = _.lowerCase(req.params.postName);
  let listOfItem = -1;
  posts.forEach((post, index) =>{
    if (deleteTitle === _.lowerCase(post.title)) {
      listOfItem = index;
      posts.splice(listOfItem, 1);
      res.redirect("/");
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
