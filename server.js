console.log("First CRUD app\n");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
const MongoClient = require("mongodb").MongoClient;
//  same as const { MongoClient } = require('mongodb');
const connectionString =
  "mongodb+srv://Praveen:Praveen585@crudapp.xfn55.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// MongoClient.connect(connectionString, (err,client)=>{

// // to be added
// if(err) return console.log(err);
// console.log('Connected to MONGO🍀');

// });
// using promises
MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to MONGO🍀");
    const db = client.db("marvel-quotes-app");
    const quotesCollection = db.collection("quotes");
    // CREATE
    app.post("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((err) => console.error(err));
    });

    //READ
    app.get("/", (req, res) => {
      const cursor = db
        .collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.render("index.ejs", { quotes: results });
        })
        .catch((err) => console.error(err));
      // console.log(cursor);
    });
    // UPDATE

    app.put("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate(
          { name: "Tony Stark" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          //   console.log(result);

          res.json("Success!!!");
        })
        .catch((err) => console.error(err));
    });

    // DELETE
    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }

          res.json(`Deleted Thanos' quote`);
        })
        .catch((err) => console.error(err));
    });




  })
  .catch((err) => console.log(err));

// Listen at a port
const port = process.env.PORT || 3000 ; 
app.listen(port, function () {
  console.log(`Listening at port ${port} 🦻🦻🦻`);
});

// app.get("/", function (req, res) {
//   // res.send('Hello Node!');
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/quotes", function (req, res) {
//   console.log(req.body);
//   console.log("POSTED✅");
// });
