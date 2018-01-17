/*//-------------------------------------Adam commented out
var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  //res.render('gradtask', { title: 'Express' });
    res.send("Welcome to Gradtask");
});*/

//---------------------------------------Adam's code below
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Tasks = require('../models/gradtaskmodel');

var taskRouter = express.Router();
taskRouter.use(bodyParser.json());

taskRouter.route('/')
.get(function (req, res, next) {
    Tasks.find({}, function (err, task) {
        if (err) throw err;
        res.json(task);
    });
})

.post(function (req, res, next) {
    Tasks.create(req.body, function (err, task) {
        if (err) throw err;
        console.log('Task created!');
        var id = task._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the task with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Tasks.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

taskRouter.route('/:taskId')
.get(function (req, res, next) {
    Tasks.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        res.json(task);
    });
})

.put(function (req, res, next) {
    Tasks.findByIdAndUpdate(req.params.taskId, {
        $set: req.body
    }, {
        new: true
    }, function (err, task) {
        if (err) throw err;
        res.json(task);
    });
})

.delete(function (req, res, next) {
    Tasks.findByIdAndRemove(req.params.taskId, function (err, resp) {if (err) throw err;
        res.json(resp);
    });
});

taskRouter.route('/:taskId/comments')
.get(function (req, res, next) {
    Tasks.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        res.json(task.comments);
    });
})

.post(function (req, res, next) {
    Tasks.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        task.comments.push(req.body);
        task.save(function (err, task) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(task);
        });
    });
})

.delete(function (req, res, next) {
    Tasks.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        for (var i = (task.comments.length - 1); i >= 0; i--) {
            task.comments.id(task.comments[i]._id).remove();
        }
        task.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

taskRouter.route('/:taskId/comments/:commentId')
.get(function (req, res, next) {
    Tasks.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        res.json(task.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Tasks.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        task.comments.id(req.params.commentId).remove();
        task.comments.push(req.body);
        task.save(function (err, task) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(task);
        });
    });
})

.delete(function (req, res, next) {
    Tasks.findById(req.params.taskId, function (err, task) {
        task.comments.id(req.params.commentId).remove();
        task.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = taskRouter;
//---------------------------------------Adam's code above

//module.exports = router;