angular.module("hvm")
.constant("imageServerUrl","http://www.smartworks.net/product-images/")
.constant("getAttributeListUrl","http://localhost:8080/HVM/getAttributeList.sw")
.constant("getAttributeListSizeUrl","http://localhost:8080/HVM/getAttributeListSize.sw")
.constant("getActivityListUrl","http://localhost:8080/HVM/getActivityList.sw")
.constant("getActivityListSizeUrl","http://localhost:8080/HVM/getActivityListSize.sw")
.constant("getValueListUrl","http://localhost:8080/HVM/getValueList.sw")
.constant("getValueListSizeUrl","http://localhost:8080/HVM/getValueListSize.sw")
.constant("getPssProjectUrl","http://localhost:8080/HVM/getPssProjectByName.sw")
.constant("getPssValuesUrl","http://localhost:8080/HVM/getPssValuesByPssPrjId.sw")
.constant("getSbpProjectUrl","http://localhost:8080/HVM/getSbpProject.sw")
.constant("getSbpActivityUrl","http://localhost:8080/HVM/getSbpActivity.sw")
.controller("hvmCtl", function($scope, $location, $cookies){
	$scope.viewMode = "view";
	
	$scope.viewType = $cookies.get("nowViewType");
	
	$scope.mainView = function(){
		$cookies.put("nowViewType","value");
		$scope.viewType ="value";
		$location.path("/valueList");
	}
	$scope.changeViewType = function() {
		console.log("viewType : " + $scope.viewType);
		if ($scope.viewType === "value") {
			$cookies.put("nowViewType","value");
			$location.path("/valueList");
		} else if ($scope.viewType === "activtiy"){
			$cookies.put("nowViewType","activtiy");
			$location.path("/activityList");
		} else {
			$cookies.put("nowViewType","attribute");
			$location.path("/attributeList");
		}
	}
	$scope.createAttribute = function() {
		console.log($scope.viewType);
		$location.path("/newAttr/"+$scope.viewType);
	}
})
.service("retrieveServicePost",['$http', function($http){
	return {
		retrieve: function(url, viewType, keywords, pageSize, pageNo) {
			console.log(url, viewType, keywords, pageSize, pageNo);
			return $http.post(url,{"viewType":viewType, "searchKey": keywords,"pageSize":pageSize,"pageNo":pageNo});
		}
	}
}])
.service("searchServicePost",['$http', function($http){
	return {
		search: function(url, keywords) {
			console.log(url, keywords);
			return $http.post(url,{"searchKey": keywords});
		}
	}
}])
.service("searchServiceGet",['$http', function($http){
	return {
		search: function(url) {
			console.log(url);
			return $http.get(url);
		}
	}
}])
.directive('bgImage', function(){
    return function(scope, element, attrs) {
        element.css({
            'background-image': 'url(' + attrs.bgImage +')',
            'background-size' : '100% 100%'
        });
    };
})