const express = require('express')
const router = express.Router()

const setRedis = require('../set_redis')


const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.post('/:id', (req, res, next) => {
	Post.findById(req.params.id).exec((err, post) => {
		if(err) return res.send(err)
		var comment = new Comment({
			text: req.body.text,
			author: req.user._id,
			author_name: req.user.name,
			post: post._id
		})

		comment.save((err, comment) => {
			if(err) return res.send(err)
			post.comments.push(comment._id)
			post.save((err, post) => {
				if(err) return res.send(err)
				res.send(comment)
				setRedis(req.params.id)
			})
		})
	})
})

router.delete('/:comment_id/:post_id', (req, res, next) => {
	Comment.remove({_id: req.params.comment_id})
		.exec((err, result) => {
			if(err) return res.send(err)
			Post.findById(req.params.post_id)
				.exec((err, post) => {
					post.comments = post.comments.filter((comment) => comment != req.params.comment_id)
					post.save((err, post) => {
						if(err) return res.send(err)
						res.send(200)
						setRedis(req.params.post_id)
					})
				})

		})
})

router.put('/',  (req, res, next) => {
	Comment.findById(req.body._id).exec((err, comment) => {
		if(err) {
			res.status(500).send(err)
		} else {
			comment.text = req.body.text
			comment.save((err, result) => {
				if(err) {
					res.status(500).send(err)
				} else {
					res.status(200).send(result)
					setRedis(req.body._id)
				}
			})
		}
	})
})

module.exports = router