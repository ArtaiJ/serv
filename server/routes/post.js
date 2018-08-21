const express = require('express')
const multer  = require('multer')
const fs = require('fs')
const path = require('path')
const upload = multer({ dest: 'uploads/' })
const redis = require('redis')

const router = express.Router()
const asyncMiddleware = require('../async')
const setRedis = require('../set_redis')

const client = redis.createClient()
client.on('error', (err) => console.log(`Error: ${err}`))

const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/search/:search_text', asyncMiddleware(async(req, res, next) => {
	const myRegExp = new RegExp(`${req.params.search_text}`, 'i')

	let result = await Post.find({
		$or: [
			{title: myRegExp},
			{content: myRegExp}
		]
	}).limit(5).exec()

	res.send(result)
}))

// подключаем все роуты
router.get('/home/:page', (req, res, next) => {
	Post.find()
		.skip((req.params.page - 1) * 3)
		.limit(3)
		.exec((err, posts) => {
			if(err) return res.send(err)
			Post.count().exec((err, count) => {
				if(err) return res.send(err)
				res.send({posts: posts, count: count})
			})
		})
})

router.get('/:id', (req, res, next) => {
	client.get(req.params.id, (err, post) => {
		if(err) return res.send(err)
		if(post) {
			res.send(JSON.parse(post))
			console.log('redis')
		} else {
			Post.findById(req.params.id).populate('comments')
			.exec((err, post) => {
				if(err) return res.send(err)
				client.set(req.params.id, JSON.stringify(post), redis.print)
				res.send(post)
				console.log('mongo')
			})
		}
	})
	
})

router.post('/', upload.single('file'), (req, res, next) => {
	var post = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	})

	let tempPath = req.file.path;
	let targetPath = path.resolve(`public/uploads/${post._id}.${req.file.originalname.split('.').pop()}`);
	fs.rename(tempPath, targetPath, (err) => {
		if(err) return res.send(err)
		post.link = `uploads/${post._id}.${req.file.originalname.split('.').pop()}`
		post.save((err, post) => {
		if (err) return res.send(err)
		res.send(post)
	})
	})
})

router.delete('/:id', (req, res, next) => {
	Post.remove({_id: req.params.id})
		.exec((err, result) => {
			if(err) return res.send(err)
			res.send(200)
		})
})



router.put('/',  (req, res, next) => {
	Post.findById(req.body._id).exec((err, post) => {
		if(err) {
			res.status(500).send(err)
		} else {
			post.title = req.body.title
			post.content = req.body.content
			post.author = req.body.author
			post.save((err, result) => {
				if(err) {
					res.status(500).send(err)
				} else {
					res.status(200).send(result)
					console.log(post)
					setRedis(req.body._id)
				}
			})
			// 
		}
	})
})

router.put('/like/:id', asyncMiddleware(async(req, res, next) => {
	if(req.user) {
		var post = await Post.findById(req.params.id).exec()
		var index = post.liked_users.indexOf(req.user._id)

		if(index >= 0) {
			post.liked_users = post.liked_users.filter((user) => user != `${req.user._id}`)
		} else {
			post.liked_users.push(req.user._id)
		}

		post.save((err, post) => {
			if(err) res.send(err)
			res.send(post)
		})

	} else {
		res.sendStatus(401)
	}
}))




module.exports = router