angular.module("hvm")
.constant("imageServerUrl","http://www.smartworks.net/product-images/")
.constant("getAttributeListUrl","http://localhost:8080/HVM/getAttributeList.sw")
.constant("getAttributeListSizeUrl","http://localhost:8080/HVM/getAttributeListSize.sw")
.constant("getActivityListUrl","http://localhost:8080/HVM/getActivityList.sw")
.constant("getActivityListSizeUrl","http://localhost:8080/HVM/getActivityListSize.sw")
.constant("getValueListUrl","http://localhost:8080/HVM/getValueList.sw")
.constant("getValueListSizeUrl","http://localhost:8080/HVM/getValueListSize.sw")
.controller("hvmCtl", function($scope, $location){
	$scope.viewMode = "view";
	$scope.viewType = "value";
	
	$scope.changeViewType = function() {
		console.log("viewType : " + $scope.viewType);
		if ($scope.viewType === "value") {
			$location.path("/valueList");
		} else if ($scope.viewType === "activtiy"){
			$location.path("/activityList");
		} else {
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
.directive('bgImage', function(){
    return function(scope, element, attrs) {
        element.css({
            'background-image': 'url(' + attrs.bgImage +')',
            'background-size' : '100% 100%'
        });
    };
})