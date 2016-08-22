angular.module("hvm")
.controller("projectListCtrl", function($scope, $routeParams, $cookies, $location, $rootScope, getProjectListUrl, getProjectListSizeUrl, retrieveServicePost,removeProjectPost, imageServerUrl, getAttributeListUrl, getAttributeListSizeUrl, removeProjectUrl) {

	$scope.viewType = $cookies.get("nowViewType");
	if ($scope.viewType == undefined)
		$scope.viewType = "Value";
	
	$scope.selectedItem = $scope.viewType;
	
	$scope.showProjectList = $scope.viewType == 'Value' || $scope.viewType== 'Activity' ? true : false;
	$scope.showAttributeList = $scope.viewType == 'Value' || $scope.viewType== 'Activity' ? false : true;
	
	$scope.selectViewType = function(index) {
		//$scope.$apply(function(){
		//})
		
		$scope.selectedItem = $scope.selectItem[index];
		$scope.viewType = $scope.selectItem[index];
		$cookies.put("nowViewType",$scope.selectItem[index]);
		$scope.showViewTypeList = false;
		
		if ($scope.viewType == 'Value' || $scope.viewType == 'Activity') {
			$scope.showProjectList = true;
			$scope.showAttributeList = false;
		} else {
			$scope.showProjectList = false;
			$scope.showAttributeList = true;
		}
		
	}
	
	
	$scope.removeProject = function(project) {
		var projectId = project.id;
		
		removeProjectPost.removeProject(removeProjectUrl, projectId).then(function(response){
			//alert('delete project done');
//			var totalSize = response.data.totalSize;
//			$scope.totalPages = Math.ceil(totalSize/$scope.prjPageSize);
//			console.log('proejctListCtrl : ' , $scope.totalPages,totalSize);
			$scope.clickPrjPageNo(0);
			//$scope.clickAttrPageNo(0);
		})
		
	}
	
	$scope.enterKeySearch = function(keyEvent) {
	  if (keyEvent.which === 13)
		  $scope.search()
	}
	
	$scope.search = function() {
		console.log('projectListCtrl : search : ',$scope.keywords);
		$scope.clickPrjPageNo(0);
		$scope.clickAttrPageNo(0);
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
	
	
	//project page pagination
	$scope.prjPageSize = 1;
	$scope.prjPageNo = 0;
	
	$scope.result = [];
	
	$scope.clickPrjPageNo = function(pNo) {
		$scope.prjPageNo = pNo;
		
		retrieveServicePost.retrieve(getProjectListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalPages = Math.ceil(totalSize/$scope.prjPageSize);
			console.log('proejctListCtrl : ' , $scope.totalPages,totalSize);
		})
		retrieveServicePost.retrieve(getProjectListUrl, $scope.viewType, $scope.keywords, $scope.prjPageSize, $scope.prjPageNo).then(function(response){
			$scope.result = response.data;
			//console.log(JSON.stringify($scope.result))
		})
	}
	$scope.clickPrjPageNo(0);
	
//	$scope.editValue = function(value) {
//		$rootScope.editObj = value;
//		$location.path("/newAttr/"+$scope.viewType);
//	}
	
	
	//attribute page pagenation
	$scope.attrPageSize = 20;
	$scope.attrPageNo = 0;
	
	$scope.attrResult = [];
	
	$scope.clickAttrPageNo = function(pNo) {
		$scope.attrPageNo = pNo;
		
		retrieveServicePost.retrieve(getAttributeListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalAttrPages = Math.ceil(totalSize/$scope.attrPageSize);
		})
		retrieveServicePost.retrieve(getAttributeListUrl, $scope.viewType, $scope.keywords, $scope.attrPageSize, $scope.attrPageNo).then(function(response){
			$scope.attrResult = response.data;
			//console.log('projectListCtrl : resultAttribute : ',JSON.stringify($scope.attrResult))
		})
	}
	$scope.clickAttrPageNo(0);
	
	
})