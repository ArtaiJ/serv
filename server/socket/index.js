module.exports = (io) => {
	io.sockets.on('connection', (socket) => {
		console.log('sockets connetcted')

		socket.on('roomentered', (data) => {
			socket.room = data.room._id
			socket.join(socket.room)
			socket.user_name = data.author
			socket.emit('updateroom', 'SERVER', 'You have joined to ' + data.room.name)
			socket.broadcast.to(socket.room).emit('updateroom', 'SERVER', 'User ' + data.author + ' has joined to chat')
		})

		socket.on('changeroom', (data) => {
			socket.broadcast.to(socket.room).emit('updateroom', 'SERVER', socket.user_name + ' had left chet')
			socket.leave(socket.room)
			socket.room = data.room._id
			socket.join(socket.room)
			socket.emit('updateroom', 'SERVER', 'You have joined to ' + data.room.name);
			socket.broadcast.to(socket.room).emit('updateroom', 'SERVER', 'User ' + socket.user_name + ' has joined to chat')
		})

		socket.on('newmessadge', (data) => {
			socket.emit('updateroom', data.author, data.text)
			socket.broadcast.to(socket.room).emit('updateroom', data.author, data.text)
		})

		socket.on('getmessage', (data) => {
			Message.find({room: room._id}).exec((err, messages) => {
				socket.emit('', messages)
				
			})
		})
	})
}

