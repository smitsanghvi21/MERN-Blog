const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb");
const app = express();

app.use(bodyParser.json());

app.get("/api/articles/:name", async (req, res) => {
  try {
    const articleName = req.params.name;

    // Establishing connection with local MongoDB
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,useUnifiedTopology: true
    });
    const db = client.db("blogapp");

    //Finding url param in the db
    const articleInfo = await db
      .collection("articlesdb")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});
//For likes
app.post("/api/articles/:name/likes", async (req, res) => {

  try {
    const articleName = req.params.name;
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,useUnifiedTopology: true
    });
    const db = client.db("blogapp");
    const foundArticle = await db
      .collection("articlesdb")
      .findOne({ name: articleName });
    const addLikes = foundArticle.upvotes + 1;
    const updateLikes = { $set: { upvotes: addLikes } };
    await db
      .collection("articlesdb")
      .updateOne({ name: articleName }, updateLikes);

    const updated = await db
      .collection("articlesdb")
      .findOne({ name: articleName });
    res.status(200).json(updated);
    client.close();
  } catch (error) {
    res.status(500).send("update failed");
  }
});

//For comments
app.post("/api/articles/:name/comment", async (req, res) => {


  try {
    const { user, text } = req.body;
    const articleName = req.params.name;
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true, useUnifiedTopology: true
    });
    const db = client.db("blogapp");

    const foundName = await db
      .collection("articlesdb")
      .findOne({ name: articleName });
    const store = foundName.comments.concat({user, text});
    const addComment = { $set: { comments: store } };

    const update = await db
      .collection("articlesdb")
      .updateOne({ name: articleName }, addComment);
    const show = await db
      .collection("articlesdb")
      .findOne({ name: articleName });

    res.status(200).json(show);
    client.close();
  } catch (error) {
    res.status(500).send("update failed");
  }

  // res.status(200).send(articlesinfo[articleName].comments);
});
app.listen(5000, () => console.log("listening on port 5000"));
