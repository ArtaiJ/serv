app.filter('mydate', DateFilter);

function DateFilter() {
	var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	return function(date) {
		return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
	}
}