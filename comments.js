// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create web server
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true });

// Use body parser
app.use(bodyParser.json());

// Create a comment
app.post('/comment', (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(comment);
        }
    });
}
);

// Get all comments
app.get('/comment', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(comments);
        }
    });
}
);

// Get a comment by id
app.get('/comment/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(comment);
        }
    });
}
);

// Update a comment by id
app.put('/comment/:id', (req, res) => {

    let comment = {
        name: req.body.name,
        comment: req.body.comment
    };

    Comment.findByIdAndUpdate(req.params.id, comment, (err, comment) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(comment);
        }
    });
}
);

// Delete a comment by id
app.delete('/comment/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err, comment) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(comment);
        }
    });
}
);

// Start web server
app.listen(3000, () => {
    console.log('Web server started at port 3000');
}
);