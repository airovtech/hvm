angular.module("hvm")
.controller("attributeListCtrl", function($scope, $routeParams, getAttributeListUrl, getAttributeListSizeUrl, retrieveServicePost) {
	$scope.view_type = "attribute";
	//$scope.view_type = $routeParams.viewType;
	
	$scope.pageSize = 10;
	$scope.pageNo = 0;
	
	$scope.result = [];
	
	$scope.clickPageNo = function(pNo) {
		$scope.pageNo = pNo;
		
		retrieveServicePost.retrieve(getAttributeListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalPages = Math.ceil(totalSize/$scope.pageSize);
		})
		retrieveServicePost.retrieve(getAttributeListUrl, $scope.viewType, $scope.keywords, $scope.pageSize, $scope.pageNo).then(function(response){
			$scope.result = response.data;
			//console.log(JSON.stringify($scope.result))
		})
	}
	$scope.clickPageNo(0);
	
})