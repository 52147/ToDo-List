//jshint esversion:6

// use require() to load express and body-parser module
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // require mongoose module
const _ = require('lodash');


// create an express application
const app = express();

// connect with mongoose MongoDB
mongoose.connect("mongodb+srv://123:123@cluster0.qc3xle7.mongodb.net/todolistDB", {
  useNewUrlParser: true
});

// mongodb schema : schema map with mongo db collection
const itemSchema = {
  name: String
};

// model function: a instance of document
const Item = mongoose.model("Item", itemSchema);

// create 3 document
const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

// put the 3 item in the array
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

// put the middleware ejs at the path "view-engine"
app.set('view engine', 'ejs');

// use bodyParser middleware urlendcode function
app.use(bodyParser.urlencoded({
  extended: true
}));

// use middleware to access static file via http
app.use(express.static("public"));

// send data back when receive get request from the path '/'
app.get("/", function (req, res) {

  // create a find function to find item(empty bracket means find all)
  Item.find({}, function (err, foundItems) {

    // if there is nothing in Item, insert 3 item, else display foundItems on browser
    if (foundItems.length === 0) {
      // insert mant document in mongo db
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/"); // redirect to / (root browser)
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }


  });
});


app.get("/", function (req, res) {

  Item.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });

});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });


});


// use post to deal with the data that user submit from browser
app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

// delete function
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, function (err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }

});


app.get("/about", function (req, res) {
  res.render("about");
});



// list on local host 3000(website) for connection
app.listen(process.env.PORT || 3000, function () {

  console.log("Server started on port 3000");

});