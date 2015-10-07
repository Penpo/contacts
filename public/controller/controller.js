var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', function($scope, $http) {
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
			$scope.contactlist = response;
			document.forms["contactform"].reset();
		});
	};
	$scope.remove = function(id){
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		})
	};
	$scope.edit = function(contact){
		$scope.contact = contact;
	}
	$scope.update = function(){
		// console.log($scope.contact)
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			// refresh();
			if (response.result) {
				document.forms["contactform"].reset();
			} else{
				alert("修改失败");
			};
		})
	}
	$scope.deselect = function(){
		$scope.contact = [];
	}
});
