app.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$http', '$scope', '$state', '$rootScope'];

function LoginCtrl($http, $scope, $state, $rootScope) {
	var vm = this;

	vm.login = function() {
		var data = {
			email: vm.email,
			password: vm.password
		}

		$http.post('/api/login', data)
			.success(function(response) {
				$rootScope.session = response;
				$state.go('home');
			})
			.error(function(err) {
				console.log(err);
			})
	}
}