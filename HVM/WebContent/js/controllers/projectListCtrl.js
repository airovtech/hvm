angular.module("hvm")
.controller("projectListCtrl", function($scope, $routeParams, $cookies, $location,$rootScope, getProjectListUrl, getProjectListSizeUrl, retrieveServicePost, imageServerUrl) {

	$scope.viewType = $cookies.get("nowViewType");
	if ($scope.viewType == undefined)
		$scope.viewType = "Value";
	
	$scope.selectViewType = function(index) {
		//$scope.$apply(function(){
		//})
		$scope.selectedItem = $scope.selectItem[index];
		$scope.viewType = $scope.selectItem[index];
		$cookies.put("nowViewType",$scope.selectItem[index]);
		$scope.showViewTypeList = false;
	}
	
	$scope.showAttrList = function(listType) {
		if ($scope.viewType == listType) {
			return true;
		} else {
			return false;
		}
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
	
	$scope.pageSize = 10;
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