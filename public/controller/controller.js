var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	// 数据模板
	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			$scope.contactlist = response;
			document.forms["contactform"].reset();
		});
	}
	refresh();
	$scope.addContact = function(){
		$http.post('/contactlist',$scope.contact).success(function(response){
			refresh();
		});
	};
	$scope.remove = function(id){
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		})
	};
	$scope.edit = function(id){
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		})
	}
	$scope.update = function(){
		// console.log($scope.contact)
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		})
	}
	$scope.deselect = function(){
		$scope.contact = [];
	}
}]);
