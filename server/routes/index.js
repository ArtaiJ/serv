const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const nodemailer = require('nodemailer');


const User = require('../models/User')

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
	    user: 'artaijantest@gmail.com', // generated ethereal user
	    pass: 'beixzkdqdfmkwqoj' // generated ethereal password
	}
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, next) => {
	User.findOne({email: email, accept: true}).exec((err, user) => {
		if (err) return next(err, null)
		if (!user) return next(err, null)
		user.comparePassword(password, (err, isEqual) => {
			if (err) return next(err, null)
			if (isEqual) return next(null, user)
			return next(null, false)
		})
	})
}))

passport.serializeUser((user, next) => {
	return next(null, user._id)
})

passport.deserializeUser((id, next) => {
	User.findById(id).exec(function(err, user) {
		return next(err, user)
	})
})

//gmail password: beixzkdqdfmkwqoj


router.use(passport.initialize())
router.use(passport.session())



router.post('/login', passport.authenticate('local'), (req, res, next) => {

	res.cookie('session', JSON.stringify(req.user))
	res.send(req.user)

	// User.findOne({email: req.body.email})
	// 	.exec((err, user) => {
	// 		if (err) return res.status(400).send(err)
	// 		if(!user) return res.send(400)
	// 		user.comparePassword(req.body.password, (err, isEqual) => {
	// 			if (err) return res.status(400).send(err)
	// 			if(!isEqual) {
	// 				res.send(400)
	// 			} else {
	// 				res.cookie('session', JSON.stringify(user))
	// 				res.send(user)
	// 			}
	// 		})
	// 	})


	// if(req.body.email == 'admin@gmail.com' && req.body.password == 'admin') {
	// 	var session = {id:12345}
	// 	res.cookie('session', JSON.stringify({id:12345}))
	// 	res.send(session)
	// } else {
	// 	res.status(400).send('Error!')
	// }
})

router.post('/logout', (req, res, next) => {
	res.clearCookie('session')
	res.send(200)
})

router.post('/registration', (req, res, next) => {
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		accept: req.body.accept
	})


	user.save((err, user) => {
		if(err) return res.send(err)
		let mailOptions = {
			from: '"Registration" <artaijantest@gmail.com>', // sender address
			to: user.email, // list of receivers
			subject: 'Hello ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: `<a href="http://localhost:3000/api/accept/${user._id}">Moveto link</a>` // html body
		}

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) return res.status(401).send(err)
			res.send(200)
		})
	})
})


router.get('/accept/:id', (req, res, next) => {

	User.findById(req.params.id).exec(function(err, user) {
		if (err) return res.send(err)
		user.accept = true
		user.save(function(err, user) {
			if (err) return res.send(err)
			res.redirect('/login')
		})
	})

})





// подключаем все роуты
router.use('/post', require('./post'))
router.use('/comment', require('./comment'))

module.exports = router