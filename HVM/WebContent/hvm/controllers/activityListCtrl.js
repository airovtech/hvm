angular.module("hvm")
.controller("activityListCtrl", function($scope, $routeParams,$rootScope, $location, getActivityListUrl, getActivityListSizeUrl, retrieveServicePost, imageServerUrl) {
	$scope.viewType = "activity";
	//$scope.view_type = $routeParams.viewType;

	$scope.image_path = imageServerUrl;
	
	$scope.pageSize = 10;
	$scope.pageNo = 0;
	
	$scope.result = [];
	
	$scope.clickPageNo = function(pNo) {
		$scope.pageNo = pNo;
		
		retrieveServicePost.retrieve(getActivityListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalPages = Math.ceil(totalSize/$scope.pageSize);
		})
		retrieveServicePost.retrieve(getActivityListUrl, $scope.viewType, $scope.keywords, $scope.pageSize, $scope.pageNo).then(function(response){
			$scope.result = response.data;
			//console.log(JSON.stringify($scope.result))
		})
	}
	$scope.clickPageNo(0);

	$scope.editActivity = function(activity) {
		$rootScope.editObj = activity;
		$location.path("/newAttr/"+$scope.viewType);
	}
})