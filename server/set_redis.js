const redis = require('redis')
const Post = require('./models/Post')
const Comment = require('./models/Comment')

const client = redis.createClient()
client.on('error', (err) => console.log(`Error: ${err}`))



const setRedis = function(id) {
	Post.findById(id).populate('comments')
		.exec((err, post) => {
			if(err) return console.log(err)
			client.set(id, JSON.stringify(post), redis.print)
			console.log('save mongo')
		})
}

module.exports = setRedis