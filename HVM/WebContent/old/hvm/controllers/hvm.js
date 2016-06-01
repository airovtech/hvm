angular.module("hvm")
.constant("testUrl","http://localhost:8080/HVM/getHvmAttrList.sw")
.controller("hvmCtl", function($scope, testUrl, $http, searchServicePost, searchServiceGet) {
	$scope.data = {};
	$http.get(testUrl).success(function(data){
		$scope.data.attrList = data;
	}).error(function(error){
		$scope.data.attrList.error = error;
	});
})
