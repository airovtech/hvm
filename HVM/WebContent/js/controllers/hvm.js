angular.module("hvm")
.constant("imageServerUrl","http://www.smartworks.net/product-images/")
.constant("getProjectListUrl","/HVM/getHvmProjects.sw")
.constant("getProjectListSizeUrl","/HVM/getHvmProjectSize.sw")
.constant("getAttributeListUrl","/HVM/getHvmAttributes.sw")
.constant("getAttributeListSizeUrl","/HVM/getHvmAttributeSize.sw")
.constant("removeProjectUrl","/HVM/removeHvmProject.sw")
.constant("getEmptyProject","/HVM/getHvmEmptyProject.sw")
.constant("getEmptyAttribute","/HVM/getHvmEmptyAttribute.sw")
.constant("sbpProjectListApi","/HVM/util/crossDomainCaller.jsp")
.constant("pssProjectListApi","/skkupss/layoutsForHvm.jsp")
.constant("valueDetailFrameUrl","/skkupss/valueSpacePopup.jsp?psId=")
.constant("pssDetailFrameUrl","/skkupss/psInstanceListPopup.jsp?psId=")
.constant("getSkkupssPssProjectListUrl","/HVM/getSkupssProjects.sw")
.constant("setHvmProjectUrl","/HVM/setHvmProject.sw")
.constant("getPagingInfoUrl","/HVM/getPagingInfo.sw")
.controller("hvmCtl", function($scope,$rootScope, $location, $cookies, retrieveCurrentUser, imageServerUrl, logoutSvc){

	
	$scope.receipPostMessage = function(value) {
		$rootScope.$broadcast('selectSbpPostMessage', { sbpData: value });
	}
	
	$scope.viewType = $cookies.get("nowViewType");
	if ($scope.viewType == undefined)
		$scope.viewType = "Value";
	
	//상단 뷰타입을 결정
	$scope.selectItem = ["Value","Activity","Attribute"];
	$scope.selectedItem = $scope.viewType;

	
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

	
	$scope.createAttribute = function() {
		console.log($scope.viewType);
		$location.path("/newAttr/"+$scope.viewType);
	};

	$scope.logout = function() {
		$cookies.remove("nowViewType");
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
.service("removeProjectPost",['$http', function($http){
	return {
		removeProject: function(url, projectId) {
			console.log(url, projectId);
			return $http.post(url,{"projectId": projectId});
		}
	}
}])
.service("getPagingInfoPost",['$http', function($http){
	return {
		getPagingInfo: function(url, totalSize, currentPage, pageSize) {
			console.log('getPAGINGINFO #### ', url, totalSize, currentPage, pageSize);
			return $http.post(url,{"totalSize": totalSize,"currentPage":currentPage,"pageSize":pageSize});
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
		retrieve: function(url, viewType, keywords, pageSize, pageNo, psId) {
			console.log(url, viewType, keywords, pageSize, pageNo, psId);
			return $http.post(url,{"viewType":viewType, "searchKey": keywords,"pageSize":pageSize,"pageNo":pageNo,"psId":psId});
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
.directive('refreshable', [function () {
    return {
        restrict: 'A',
        scope: {
            refresh: "=refreshable"
        },
        link: function (scope, element, attr) {
            var refreshMe = function () {
                element.attr('src', element.attr('src'));
            };

            scope.$watch('refresh', function (newVal, oldVal) {
                if (scope.refresh) {
                    scope.refresh = false;
                    refreshMe();
                }
            });
        }
    };
}])