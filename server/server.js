const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const User = require("./user");
const Upload = require("./upload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "social-media-secret",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookieParser("social-media-secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

mongoose.connect("mongodb://localhost:27017/Social", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//multer for posting pictures and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//authenticate user
app.post("/register", upload.single("profilePic"), (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        profilePic: "default.png",
      });
      await newUser.save();
      res.send("New user created");
    }
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    if (user) {
      req.logIn(user, (err) => {
        res.send("Success");
      });
    }
  })(req, res, next);
});

app.post("/logout", (req, res, next) => {
  req.logout();
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

//update profile details
app.post("/api/update", upload.single("profilePic"), (req, res) => {
  if (!req.body.newPassword) {
    User.findById(req.user._id, (err, result) => {
      result.username = req.body.username;
      result.password = req.body.password;
      result.email = req.body.email;
      if (req.file) result.profilePic = req.file.originalname;
      result.save((err) => {
        if (err) throw err;
      });
      res.send("Profile Updated!");
    });
  } else {
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
      User.findById(req.user._id, (err, result) => {
        if (err) throw err;
        bcrypt.compare(req.body.oldPassword, result.password, (err, ok) => {
          if (err) throw err;
          if (ok) {
            result.username = req.body.username;
            result.email = req.body.email;
            result.password = hash;
            if (req.file) result.profilePic = req.file.originalname;
            result.save((err) => {
              if (err) throw err;
            });
            res.send("Profile Updated!");
          }
          if (!ok) {
            res.send("Old password does not match!");
          }
        });
      });
    });
  }
});

//upload photos,videos along with posts.
//for only caption
app.post("/upload/post", (req, res) => {
  const newPost = new Upload({
    username: req.user.username,
    post: req.body.caption,
  });
  newPost.save((err) => {
    if (err) throw err;
    req.user.userPost.push(newPost);
    req.user.save((err) => {
      if (err) throw err;
    });
    res.send("Post Successfully uploaded");
  });
});

//only for photos with caption
app.post("/upload/photo", upload.single("photoPost"), (req, res) => {
  const newPost = new Upload({
    username: req.user.username,
    post: req.body.caption,
    photo: req.file.originalname,
  });
  newPost.save((err) => {
    if (err) throw err;
    req.user.userPost.push(newPost);
    req.user.save((err) => {
      if (err) throw err;
    });
  });
  res.send("Post successfully uploaded");
});

app.post("/upload/video", upload.single("videoPost"), (req, res) => {
  const newPost = new Upload({
    username: req.user.username,
    post: req.body.caption,
    video: req.file.originalname,
  });
  newPost.save((err) => {
    if (err) throw err;
    req.user.userPost.push(newPost);
    req.user.save((err) => {
      if (err) throw err;
    });
  });
  res.send("Post successfully uploaded");
});

//view all posts
app.get("/api/posts", (req, res) => {
  Upload.find({}, (err, posts) => {
    if (err) throw err;
    res.send(posts);
  });
});

//get all private posts
app.get("/api/myposts", (req, res) => {
  User.find({ _id: req.user._id })
    .populate("userPost")
    .exec((err, posts) => {
      if (err) throw err;
      res.send(posts[0].userPost);
    });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
