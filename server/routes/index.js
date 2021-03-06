const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorize = require('../middlewares/auth');
const permission = require('../middlewares/permission');
const fs = require('fs');
const restify = require('restify');
const _ = require('lodash');
const faker = require('faker');

/*
* Mongo Models
*/
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const Token = require('../models/Token');
const Comments = require('../models/Comments');
const CommentLikes = require('../models/CommentLikes');

module.exports = (server) => {
    /* User endpoints */
    server.post('/user/create', (req, res, next) => {
        if(!req.is('application/json')) {
            return res.send({ message: "Invalid content", appCode: 40}, 400);
        }
        let data = req.body || {};

        if(typeof data.password === "undefined")
        {
            return res.send({ message: "Password cannot empty", appCode: 40}, 400);
        }

        data.password = bcrypt.hashSync(data.password, 10);
        let User = new Users(data);

        User.save((err) => {
            if(err) return res.send({ message: err.message, appCode: 40}, 400);
            res.send({ message: "User created successfully", appCode: 21 }, 201);
            next();
        });
    });
    server.post('/user/login', (req, res, next) => {

        if(!req.is('application/json')) {
            return res.send(400, { message: "Invalid content", appCode: 40});
        }

        let data = req.body || {};
        if(typeof data.username === "undefined" || typeof data.password === "undefined")
        {
            return res.send(401, { message: "Username or password cannot be empty", appCode: 41});
        }

        Users.findOne({ username: data.username }, (err, doc) => {
            if(err) res.send(400, { message: err.message, appCode: 40});
            if(doc === null){
                res.send(401, { error: true, message: "User not found by usernamey" ,appCode: 41});
            }else {
                bcrypt.compare(data.password, doc.password).then(function (result) {
                    if(result === true){
                        const token = jwt.sign({
                            id: doc._id,
                            name: doc.name,
                            username: doc.username,
                            exp: Math.floor(Date.now() / 1000) + (parseInt(process.env.JWT_EXPIRE_TIME))
                        }, process.env.JWT_SECRET, {
                            algorithm: 'HS256',
                        });

                        let newTokenData = { token: token, tokenUser: data.username };

                        Token.findOne({ tokenUser: data.username }, (err, tokenData) => {
                            if(err) res.send({ message: err.message, appCode: 50}, 500);
                            if(tokenData === null)
                            {
                                let newToken = new Token(newTokenData);
                                newToken.save((err, dataTokenCreate) => {
                                    if(err) res.send(500, { message: err.message, appCode: 50});
                                    res.send(201, { message: "You have successfully logged in. You are being directed.", username: doc.username, name: doc.name ,token: token ,appCode: 21});
                                });
                            }else {
                                jwt.verify(tokenData.token, process.env.JWT_SECRET, (error,decoded) => {
                                   if(decoded === undefined)
                                   {
                                       Token.findOneAndUpdate('' + tokenData._id,{ $set: newTokenData }, (err, updateRes) => {
                                           if(err) return res.send(500, { message: err.message, appCode: 50});
                                           res.send(201, { message: "You have successfully logged in. You are being directed.", username: doc.username, name: doc.name, token: token ,appCode: 21});
                                       });
                                   }else {
                                       res.send(201, { message: "You have successfully logged in. You are being directed.", name:doc.name, username: doc.username, token: tokenData.token ,appCode: 21});
                                   }
                                });
                            }
                        });
                    }else {
                        res.send(401, { message: "User password is incorrect" ,appCode: 41});
                    }
                });
            }
        })
    });
    server.put('/user/update', authorize, (req, res, next) => {
        if(!req.is('application/json')) return res.send({ message: "Invalid content", appCode: 40}, 400);

        let data = req.body || {};

        Users.findOne({ username: req.userData.username }, (err, doc) => {
            if(doc !== null) {
                let userID = '' + doc._id;
                Users.findOneAndUpdate(userID, { $set: data }, (err, data) => {
                    if(err) return res.send({ message: err.message, appCode: 40}, 400);
                    if(data === null){
                        res.send({ message: "User not found", appCode: 44 }, 404);
                    }else {
                        res.send({ message: "User details successfully updated", appCode: 21 }, 201);
                    }
                });
            }else {
                res.send({ message:"User not found", appCode: 44 }, 404);
            }
        });

    });
    server.get('/user/me', authorize, (req, res, next) => {
        Users.findOne({ username: req.userData.username }, (err, doc) => {
            if(doc !== null) {
                let user = {
                    "name": doc.name,
                    "username": doc.username,
                    "email": doc.email,
                    "userBiography": doc.userBiography,
                    "userProfilePicture": doc.userProfilePicture,
                    "userGroup": doc.userGroup,
                    "userVerified": doc.userVerified,
                    "userSocialMedias": doc.userSocialMedias,
                    "created_at": doc.createdAt,
                    "updated_at": doc.updatedAt
                };
                res.send({ user: user, appCode: 21 });
            }else {
                res.send({ message:"User not found", appCode: 44 }, 404);
            }
        });
    });
    server.get('/user/:username', (req, res, next) => {
        Users.findOne({ username: req.params.username }, (err, doc) => {
            if(doc !== null) {
                let user = {
                    "name": doc.name,
                    "username": doc.username,
                    "userBiography": doc.userBiography,
                    "userProfilePicture": doc.userProfilePicture,
                    "created_at": doc.createdAt,
                };
                res.send({ user: user, appCode: 21 });
            }else {
                res.send({ message:"User not found", appCode: 44 }, 404);
            }
        });
    });
    server.del('/user/delete/:id', authorize, (req, res, next) => {
        permission(req.userData, "Admin", (message) => {
            if(message === true)
            {
                Users.findOneAndDelete(req.params.id, (err, data) => {
                    if(err) return res.send({ message: "Invalid content", appCode: 40}, 400);
                    if(data === null){
                        res.send({ message: "User not found", appCode: 44 }, 404);
                    }else {
                        res.send({ message: "User deleted successfully", appCode: 21 }, 201);
                    }
                })
            }else {
                res.send({ message: "Permission error", appCode: 41 }, 400);
            }
        });
    });

    /* Post endpoints */
    server.post('/post/create', authorize, (req, res, next) => {
        permission(req.userData, "Admin", (message) => {
            if(message === true)
            {
                if(!req.is('application/json')){
                    return res.send({ message: "Invalid content", appCode: 40}, 400);
                }
                let data = {
                    ...req.body
                };
                let Post = new Posts(data);
                Post.save((err) => {
                    if(err){
                        return res.send({ message: err.message, appCode: 50}, 500);
                        next();
                    }
                    res.send({ message: "Post created successfully", appCode: 21 }, 201);
                    next();
                })
            }else {
                res.send({ message: "Permission error", appCode: 41 }, 400);
            }
        });
    });
    server.get('/post/list', (req, res, next) => {
        let limit = 5;
        let page = 1;
        if (req.params.page !== undefined) page = req.params.page;

        Posts.apiQuery(req.params)
            .sort({createdAt: -1})
            .skip((limit * page) - limit)
            .limit(limit)
            .then(docs => {
                Posts.countDocuments((err, totalCount) => {
                    if (err) return res.send(400, {message: err.message, appCode: 40});
                    let posts = [];

                    let pageData = {totalPages: Math.ceil(totalCount / limit), currentPage: page};
                    posts.push(pageData);
                    docs.map(post => {
                        posts.push(post)
                    });

                    if (posts !== null) res.send(posts)
                });
            })
            .catch(err => {
                if (err) return res.send(400, {message: err.errors.name.message, appCode: 40});
            })
    });
    server.get('/post/getById/:post_id', (req, res, next) => {
        Posts.findOne({_id: req.params.post_id})
            .sort({createdAt: -1})
            .limit(5)
            .then(doc => {
                res.send(doc);
                next();
            })
            .catch(err => {
                if (err) return res.send(400, {message: err.message, appCode: 40});
            });
    });
    server.get('/post/getByCategory/:category_name', (req, res, next) => {
        Posts.find({ postCategory: req.params.category_name }, (err, doc) => {
            if(err) return res.send({ message: err.message, appCode: 40}, 400);
            res.send(doc);
            next();
        })
    });
    server.get('/post/getByAuthor/:author_name', (req, res, next) => {
        Posts.find({postAuthor: req.params.author_name})
            .sort({createdAt: -1})
            .limit(5)
            .then(doc => {
                res.send(doc);
                next();
            })
            .catch(err => {
                if (err) return res.send(400, {message: err.message, appCode: 40});
            });
    });
    server.del('/post/delete/:id', authorize, (req, res, next) => {
        permission(req.userData, "Admin", (message) => {
            if(message === true)
            {
                Posts.findOneAndDelete(req.params.id, (err, data) => {
                    if(err) return res.send({ message: "Invalid content", appCode: 40}, 400);
                    if(data === null){
                        res.send({ message: "Post not found", appCode: 44 }, 404);
                    }else {
                        res.send({ message: "Post deleted successfully", appCode: 21 }, 201);
                    }
                })
            }else {
                res.send({ message: "Permission error", appCode: 41 }, 400);
            }
        });
    });
    server.put('/post/update/:id', authorize, (req , res, next) => {
        permission(req.userData, "Admin", (message) => {
            if(message === true)
            {
                if(!req.is('application/json')) return res.send({ message: "Invalid content", appCode: 40}, 400);
                let data = req.body || {};
                Posts.findOneAndUpdate(req.params.id, { $set: data }, (err, data) => {
                    if(err) return res.send({ message: err.message, appCode: 40}, 400);
                    if(data === null){
                        res.send({ message: "Post not found", appCode: 44 }, 404);
                    } else {
                        res.send({message: "Post successfully updated", appCode: 21}, 201);
                    }
                });

            } else {
                res.send({message: "Permission error", appCode: 41}, 400);
            }
        });
    });
    server.get('/post/faker', (req, res, next) => {
        let posts = [];

        for (let i = 0; i < 10; i += 1) {
            let newPost = {
                postName: faker.lorem.words(7),
                postDesc: faker.lorem.words(50),
                postContent: faker.lorem.words(350),
                postAuthor: "relakith",
                postAuthorName: "Emirkan Acar",
                postTags: "teknoloji,lorem,ipsum",
                postCategory: "Teknoloji",
            };
            posts.push(newPost);
        }
        Posts.insertMany(posts)

    });

    /* Comment endpoints */
    server.post('/comment/create', authorize, (req, res, next) => {
        if (!req.is('application/json')) {
            return res.send({message: "Invalid content", appCode: 40}, 400);
        }
        let data = req.body || {};
        let Comment = new Comments(data);

        Comment.save((err, insertID) => {
            if (err) {
                return res.send({message: err.message, appCode: 50}, 500);
                next();
            }

            res.send({message: "Comment created successfully", appCode: 21}, 201);
            next();
        })
    });
    server.get('/comment/list/:postid', (req, res, next) => {

        let limit = 10;
        let page = 1;
        if (req.params.page !== undefined) page = req.params.page;

        Comments.find({commentTargetPostID: req.params.postid})
            .sort({createdAt: -1})
            .skip((limit * page) - limit)
            .limit(limit)
            .then(doc => {
                if (doc === null) {
                    res.send(404, {message: "Comments not found", appCode: 44});
                } else {
                    let comments = [];

                    Promise.all(doc.map(comment => {
                        return Users.findOne({username: comment.commentSenderUsername}).exec()
                    })).then(commentUser => {
                        doc.map(comment => {
                            _.find(commentUser, (obj) => {
                                if (obj.username === comment.commentSenderUsername) {
                                    comments.push({
                                        _id: comment._id,
                                        commentSenderUsername: comment.commentSenderUsername,
                                        commentSenderUser: {
                                            username: obj.username,
                                            name: obj.name,
                                            profilePicture: obj.userProfilePicture
                                        },
                                        commentTargetPostID: comment.commentTargetPostID,
                                        commentContent: comment.commentContent,
                                        commentLikeCount: comment.commentLikeCount,
                                        commentCreatedAt: comment.createdAt
                                    });
                                }
                            });
                        });

                        comments = _.uniqBy(comments, '_id');
                        if (comments !== null) res.send(comments)
                    }).catch(err => {
                        res.send(500, {message: err.message, appCode: 50})
                    });

                    next();
                }

            })
            .catch(err => {
                if (err) return res.send(400, {message: err.message, appCode: 40});
            });
    });
    server.get('/comment/getByAuthor/:authorName', (req, res, next) => {
        Comments.find({commentSenderUsername: req.params.authorName})
            .sort({createdAt: -1})
            .limit(5)
            .then(doc => {
                if (doc === null) {
                    res.send(404, {message: "Comments not found", appCode: 44});
                } else {
                    let comments = [];

                    Promise.all(doc.map(comment => {
                        return Users.findOne({username: comment.commentSenderUsername}).exec()
                    })).then(commentUser => {
                        doc.map(comment => {
                            _.find(commentUser, (obj) => {
                                if (obj.username === comment.commentSenderUsername) {
                                    comments.push({
                                        _id: comment._id,
                                        commentSenderUsername: comment.commentSenderUsername,
                                        commentSenderUser: {
                                            username: obj.username,
                                            name: obj.name,
                                            profilePicture: obj.userProfilePicture
                                        },
                                        commentTargetPostID: comment.commentTargetPostID,
                                        commentContent: comment.commentContent,
                                        commentLikeCount: comment.commentLikeCount,
                                        commentCreatedAt: comment.createdAt
                                    });
                                }
                            });
                        });

                        comments = _.uniqBy(comments, '_id');
                        if (comments !== null) res.send(comments)
                    }).catch(err => {
                        res.send(500, {message: err.message, appCode: 50})
                    });

                    next();
                }

            })
            .catch(err => {
                if (err) return res.send(400, {message: err.message, appCode: 40});
            });
    });
    server.put('/comment/like/:id', authorize, (req, res, next) => {
        if (!req.is('application/json')) {
            return res.send({message: "Invalid content", appCode: 40}, 400);
        }
        let data = req.body || {};
        let postData = {
            targetPostID: data.targetPostID,
            actionOwnerID: req.userData.id,
            targetCommentID: req.params.id
        };

        CommentLikes.find({ targetPostID: postData.targetPostID, actionOwnerID: req.userData.id, targetCommentID: req.params.id }, (err, data) => {
            if(err) return res.send({ message: err.message, appCode: 40}, 400);
            if(data.length === 0){
                let commentLike = new CommentLikes(postData);
                commentLike.save((err) => {
                    if(err) return res.send({ message: err.message, appCode: 50}, 500);
                    else {
                        res.send({ message: "Comment liked successfully", commentID: postData.targetCommentID, appCode: 21 }, 201);
                    }
                })
            }else {
                return res.send({ message: "Comment already liked", commentID: postData.targetCommentID ,appCode: 40}, 400);
            }
        });
    });
    server.put('/comment/dislike/:id', authorize, (req, res, next) => {
        if(!req.is('application/json')){
            return res.send({ message: "Invalid content", appCode: 40}, 400);
        }

        let postData = {
            targetPostID: req.body.targetPostID,
            actionOwnerID: req.userData.id,
            targetCommentID: req.params.id
        };

        CommentLikes.find({ targetPostID: postData.targetPostID, actionOwnerID: req.userData.id, targetCommentID: req.params.id }, (err, data) => {
            if(err) return res.send({ message: err.message, appCode: 40}, 400);
            if(data.length > 0){
                CommentLikes.findOneAndDelete(data._id, (err, dataDeleted) => {
                    console.log(dataDeleted);
                    if(err) return res.send({ message: err.message, appCode: 50}, 500);
                    else res.send({ message: "Comment disliked successfully", commentID: postData.targetCommentID, appCode: 21 }, 201);
                });
            }else {
                return res.send({ message: "Comment not liked", commentID: postData.targetCommentID ,appCode: 40}, 400);
            }
        });
    });
    server.del('/comment/delete/:id', authorize, (req, res, next) => {
        permission(req.userData, "Admin", (message) => {
            if(message === true)
            {
                Comments.findOneAndDelete(req.params.id, (err, data) => {
                    if(err) return res.send({ message: "Invalid content", appCode: 40}, 400);
                    if (data === null) {
                        res.send({message: "Comment not found", appCode: 44}, 404);
                    } else {
                        res.send({message: "Comment deleted successfully", appCode: 21}, 201);
                    }
                })
            } else {
                res.send({message: "Permission error", appCode: 41}, 400);
            }
        });
    });

    /* Media endpoints */
    server.get('/media/user_profiles/*', restify.plugins.serveStatic({
        directory: './public'
    }));

};
