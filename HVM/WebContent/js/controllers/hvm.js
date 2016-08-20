angular.module("hvm")
.constant("imageServerUrl","http://www.smartworks.net/product-images/")
.constant("getProjectListUrl","/HVM/getProjects.sw")
.constant("getProjectListSizeUrl","/HVM/getHvmProjectSize.sw")
//.constant("getAttributeListUrl","http://localhost:8080/HVM/getAttributeList.sw")
//.constant("getAttributeListSizeUrl","http://localhost:8080/HVM/getAttributeListSize.sw")
//.constant("getActivityListUrl","http://localhost:8080/HVM/getActivityList.sw")
//.constant("getActivityListSizeUrl","http://localhost:8080/HVM/getActivityListSize.sw")
//.constant("getPssProjectUrl","http://localhost:8080/HVM/getPssProjectByName.sw")
//.constant("getPssValuesUrl","http://localhost:8080/HVM/getPssValuesByPssPrjId.sw")
//.constant("getSbpProjectUrl","http://localhost:8080/HVM/getSbpProject.sw")
//.constant("getSbpActivityUrl","http://localhost:8080/HVM/getSbpActivity.sw")
//.constant("setValueAttributeUrl","http://localhost:8080/HVM/setValueAttribute.sw")
//.constant("setActivityAttributeUrl","http://localhost:8080/HVM/setActivityAttribute.sw")
.controller("hvmCtl", function($scope, $location, $cookies, retrieveCurrentUser, imageServerUrl, logoutSvc){

	//상단 뷰타입을 결정
	$scope.selectItem = ["Value","Activity","Attribute"];
	$scope.selectedItem = "Value";

	$scope.viewType = $cookies.get("nowViewType");
	
	//로그인사용자 
	$scope.user_image_path = imageServerUrl;
	retrieveCurrentUser.retrieveCurrentUser().then(function(response){
		$scope.currentUser = response.data;
		var userPicture = response.data.picture;
		if (!userPicture) {
			$scope.currentUser.picture = 'images/no_user.png'
		} else {
			$scope.currentUser.picture = imageServerUrl+userPicture;
		}
	});
	
	$scope.mainView = function(){
		$cookies.put("nowViewType","Value");
		$scope.viewType ="Value";
		$location.path("/valueList");
	};
//	$scope.changeViewType = function() {
//		console.log("viewType : " + $scope.viewType);
//		if ($scope.viewType === "value") {
//			$cookies.put("nowViewType","value");
//			$location.path("/valueList");
//		} else if ($scope.viewType === "activity"){
//			$cookies.put("nowViewType","activity");
//			$location.path("/activityList");
//		} else {
//			$cookies.put("nowViewType","attribute");
//			$location.path("/attributeList");
//		}
//	}
	
	$scope.createAttribute = function() {
		console.log($scope.viewType);
		$location.path("/newAttr/"+$scope.viewType);
	};

	$scope.logout = function() {
		logoutSvc.logout();
		window.location.reload();
	};
})
.service("logoutSvc",['$http', function($http){
	return {
		logout: function() {
			return $http.get('logoutProcess');
		}
	}
}])
.service("retrieveCurrentUser",['$http', function($http){
	return {
		retrieveCurrentUser: function() {
			return $http.get('getCurrentUser.sw');
		}
	}
}])
.service("setServicePost",['$http', function($http){
	return {
		setObj: function(url, setMode, obj , oldObj) {
			console.log(url, obj);
			return $http.post(url,{"result": obj,"setMode": setMode, "oldObj":oldObj});
		}
	}
}])
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