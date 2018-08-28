app.controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$http', '$scope', '$rootScope', 'Socket'];

function ChatCtrl($http, $scope, $rootScope, Socket) {
	var vm = this;

	vm.author = $rootScope.session.name;

	Socket.forward('updateroom', $scope);
	$scope.$on('socket:updateroom', function(evt, author, text) {
		console.log(author, text);

		var message = {
			author: author,
			text: text
		}

		vm.messages.push(message);
	})



	vm.rooms = [
		{
			_id: 0,
			name: 'Беседа 1'
		},
		{
			_id: 1,
			name: 'Беседа 2'
		},
		{
			_id: 3,
			name: 'Беседа 3'
		},
		{
			_id: 4,
			name: 'Беседа 4'
		}
	];

	vm.messages = [];

	vm.activeRoom = vm.rooms[0];

	Socket.emit('roomentered', {author: vm.author, room: vm.activeRoom});

	vm.selectRoom = function(room) {
		vm.activeRoom = room;
		vm.messages = [];
		Socket.emit('changeroom', {room: vm.activeRoom});
	}

	vm.sendMessage = function() {
		Socket.emit('newmessadge', {author: vm.author, text: vm.text});

		vm.text = '';
	}
}