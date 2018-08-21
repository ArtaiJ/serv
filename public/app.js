var app = angular.module('decode', [
	'ui.router',
	'ngCookies'
]);

app.config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/views/home.html',
			controller: 'MainCtrl',
			controllerAs: 'vm'
		})

		.state('profile', {
			url: '/profile',
			templateUrl: '/views/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'vm'
		})

		.state('post', {
			url: '/post/:id',
			templateUrl: '/views/post.html',
			controller: 'PostCtrl',
			controllerAs: 'vm'
		})

		.state('login', {
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'vm'
		})

		.state('registration', {
			url: '/registration',
			templateUrl: '/views/registration.html',
			controller: 'RegistrationCtrl',
			controllerAs: 'vm'
		})

		.state('filter', {
			url: '/filter',
			templateUrl: '/views/filter.html',
			controller: 'FilterCtrl',
			controllerAs: 'vm'
		});
}