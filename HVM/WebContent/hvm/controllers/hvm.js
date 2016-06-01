angular.module("hvm")
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