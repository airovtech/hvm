angular.module("hvm")
.controller("projectListCtrl", function($scope, $routeParams, $location,$rootScope, getProjectListUrl, getProjectListSizeUrl, retrieveServicePost, imageServerUrl) {
	
	$scope.viewType = "value";
	//$scope.view_type = $routeParams.viewType;
	
	$scope.selectViewType = function(index) {
		//$scope.$apply(function(){
		//})
		$scope.selectedItem = $scope.selectItem[index];
		$scope.showViewTypeList = false;
	}
	
	
	$scope.getSbpGroupIndex = function (project, sbpGroupName) {
		
		var list = project.sbpGroupList;
		for (var i = 0; i < list.length; i++) {
			var sbpGroup = list[i];
			if (sbpGroup == sbpGroupName) {
				return i
			}
		}
		return '';
	}
	
	
	$scope.image_path = imageServerUrl;
	
	$scope.pageSize = 1;
	$scope.pageNo = 0;
	
	$scope.result = [];
	
	$scope.clickPageNo = function(pNo) {
		$scope.pageNo = pNo;
		
		retrieveServicePost.retrieve(getProjectListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalPages = Math.ceil(totalSize/$scope.pageSize);
		})
		retrieveServicePost.retrieve(getProjectListUrl, $scope.viewType, $scope.keywords, $scope.pageSize, $scope.pageNo).then(function(response){
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