app.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$http', '$scope', '$state'];

function PostCtrl($http, $scope, $state) {
	var vm = this;


	$http.get('/api/post/' + $state.params.id)
		.success(function(response) {
			vm.post = response;
			console.log(vm.post);
		})
		.error(function(err) {
			console.log(err)
		});

		vm.addComment = function() {
			var data = {
				text: vm.text
			}

			$http.post('/api/comment/' + $state.params.id, data)
				.success(function(response) {
					console.log(response);
					vm.post.comments.push(response);
				})
				.error(function(err) {
					console.log(err)
				});
		}

		vm.deleteComment = function(index, comment) {
			
			$http.delete('/api/comment/' + comment._id + '/' + comment.post)
				.success(function(response) {
					vm.post.comments.splice(index, 1);
				})
				.error(function(err) {
					console.log(err);
				})
		}

		vm.selectComment = function(index, comment) {
			vm.currentComment = index;
			vm.currentCommentText = comment.text;
			vm.currentCommentId = comment._id;
		}

		vm.cancel = function() {
			vm.currentComment = null;
		}

	
		vm.editComment = function() {
			var objectToSend = {
				_id: vm.currentCommentId,
				text: vm.currentCommentText
			}

		$http.put('/api/comment', objectToSend)
			.success(function(response) {
				vm.post.comments.splice(vm.currentComment, 1, response);
				console.log(response);
				vm.cancel();
			})
			.error(function(err) {
				console.log(err);
			})
		}
}