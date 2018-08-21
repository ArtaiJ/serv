app.controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$http', '$scope', '$cookies', '$rootScope', '$state'];

function HeaderCtrl($http, $scope, $cookies, $rootScope, $state) {
	var vm = this;

	if($cookies.getObject('session')) {
		$rootScope.session = $cookies.getObject('session');
	}
	
	vm.logout = function() {
		$http.post('/api/logout')
			.success(function(response) {
				$rootScope.session = undefined;
				$state.go('home');
			})
			.error(function(err) {
				console.log(err);
			})
	}

	vm.search = function() {
		// var my_regExp = new RegExp(`${vm.search_text}`, 'i');

		if(!vm.search_text) {
			return;
		}
		
		if(vm.search_text.length > 0) {
			$http.get('/api/post/search/' + vm.search_text)
			.success(function(response) {
					vm.search_result = response;
					console.log(response);

			})
			.error(function(err) {
				console.log(err);
			})
		}


	}

	clearSearch = function() {
		vm.search_text = '';
	}

}

