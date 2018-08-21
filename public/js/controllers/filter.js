app.controller('FilterCtrl', FilterCtrl);

FilterCtrl.$inject = ['$http', '$scope'];

function FilterCtrl($http, $scope) {
	var vm = this;

	vm.employes =[
	{
		name: 'Artai',
		surname: 'Zhumakhanov',
		age: 37,
		position: 'Developer',
		date: new Date
	},
	{
		name: 'Asset',
		surname: 'Zhumakhanov',
		age: 20,
		position: 'Disigner',
		date: new Date
	},
	{
		name: 'Erbol',
		surname: 'Kashkeev',
		age: 37,
		position: 'Manager',
		date: new Date
	},
	{
		name: 'Balken',
		surname: 'Abdimanap',
		age: 37,
		position: 'Security',
		date: new Date
	},
	{
		name: 'Arman',
		surname: 'Mominov',
		age: 25,
		position: 'editor',
		date: new Date
	},
	{
		name: 'Vasya',
		surname: 'Pupkin',
		age: 26,
		position: 'driver',
		date: new Date
	},
	{
		name: 'Masha',
		surname: 'Rasputina',
		age: 27,
		position: 'singer',
		date: new Date
	},
	{
		name: 'Assel',
		surname: 'Kashkeeva',
		age: 30,
		position: 'producer',
		date: new Date
	},
	{
		name: 'Nastya',
		surname: 'Kamenskih',
		age: 29,
		position: 'secretar',
		date: new Date
	},
	{
		name: 'Katya',
		surname: 'Pushkina',
		age: 33,
		position: 'Developer',
		date: new Date
	}
	];

	vm.setFilter = function(filter) {

		if(!vm.filter) {
			vm.filter = filter;
			return;
		}

		
		if(vm.filter.includes(filter) && vm.filter[0] != '-') {
			vm.filter = '-' + filter;
		} else {
			vm.filter = filter;
		}

		
	}

	
}