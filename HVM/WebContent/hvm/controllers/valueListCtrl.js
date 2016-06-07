angular.module("hvm")
.controller("valueListCtrl", function($scope, $routeParams, $location,$rootScope, getValueListUrl, getValueListSizeUrl, retrieveServicePost, imageServerUrl) {
	$scope.viewType = "value";
	//$scope.view_type = $routeParams.viewType;

	$scope.image_path = imageServerUrl;
	
	$scope.pageSize = 10;
	$scope.pageNo = 0;
	
	$scope.result = [];
	
	$scope.clickPageNo = function(pNo) {
		$scope.pageNo = pNo;
		
		retrieveServicePost.retrieve(getValueListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalPages = Math.ceil(totalSize/$scope.pageSize);
		})
		retrieveServicePost.retrieve(getValueListUrl, $scope.viewType, $scope.keywords, $scope.pageSize, $scope.pageNo).then(function(response){
			$scope.result = response.data;
			//console.log(JSON.stringify($scope.result))
		})
	}
	$scope.clickPageNo(0);
	
	$scope.editValue = function(value) {
		$rootScope.editObj = value;
		$location.path("/newAttr/"+$scope.viewType);
	}
})