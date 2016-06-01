angular.module("hvm")
.constant("getValueListUrl","http://localhost:8080/HVM/getValueList.sw")
.constant("getValueListSizeUrl","http://localhost:8080/HVM/getValueListSize.sw")
.controller("valueListCtrl", function($scope, $routeParams, getValueListUrl, getValueListSizeUrl, retrieveServicePost) {
	$scope.view_type = "value";
	//$scope.view_type = $routeParams.viewType;
	
	$scope.pageSize = 3;
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
	
})