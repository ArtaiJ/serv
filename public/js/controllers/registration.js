app.controller('RegistrationCtrl', RegistrationCtrl);

RegistrationCtrl.$inject = ['$http', '$scope', '$state', '$rootScope'];

function RegistrationCtrl($http, $scope, $state, $rootScope) {
	var vm = this;

	vm.registration = function() {
		var data = {
			email: vm.email,
			name: vm.name,
			password: vm.password
		}

		$http.post('/api/registration', data)
			.success(function(response) {
				$state.go('login');
			})
			.error(function(err) {
				console.log(err);
			})
	}
}