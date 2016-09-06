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
.constant("setAttributeWithProjectUrl","/HVM/setHvmAttributeWithProject.sw")
.constant("removeAttributeUrl","/HVM/removeHvmAttribute.sw")
.constant("getPagingInfoUrl","/HVM/getPagingInfo.sw")
.controller("hvmCtl", function($scope,$rootScope, $location, $cookies, retrieveCurrentUser, imageServerUrl, logoutSvc){

	//post message 를 받아 하위 scope에 전달 
	$scope.receipPostMessage = function(targetKey, value) {
		$rootScope.$broadcast(targetKey, { data: value });
	}
	
	$scope.viewType = $cookies.get("nowViewType");
	if ($scope.viewType == undefined)
		$scope.viewType = "PSS";
	
	//상단 뷰타입을 결정
	$scope.selectItem = ["PSS", "SBP", "Value","Activity","Attribute"];
	$scope.selectedItem = $scope.viewType;
	
	//필터 셀렉트 박스 리스트 
	$scope.selectFilterItem = ["All","Value","Activity","Attribute","PSS","SBP"];
	
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
	
	//메인화면 로고를 클릭하였을 경우 기본 PSS 페이지로 이동한다 
	$scope.mainView = function(){
		$cookies.put("nowViewType","PSS");
		$scope.viewType ="PSS";
		
		$rootScope.$broadcast('clickMainLogo','PSS');
		
		$location.path("/projectList");
		
	};

//	$scope.createAttribute = function() {
//		console.log($scope.viewType);
//		$location.path("/newAttr/"+$scope.viewType);
//	};

	//로그아웃 
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
		},
		removeAttribute: function(url, attributeId) {
			return $http.post(url,{"attributeId": attributeId});
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
		},
		setAttributeWithProject : function(url, obj, attrIndex) {
			return $http.post(url,{"result": obj,"attrIndex": attrIndex});
			
		}
	}
}])
.service("retrieveServicePost",['$http', function($http){
	return {
		retrieve: function(url, viewType, filters, pageSize, pageNo, psId, orderColumn, isDescending) {
			console.log(url, viewType, filters, pageSize, pageNo, psId, orderColumn, isDescending);
			return $http.post(url,{"viewType":viewType, "filters": filters,"pageSize":pageSize,"pageNo":pageNo,"psId":psId,"orderColumn":orderColumn,"isDescending":isDescending});
		}
	}
}])
.service("retrieveServicePostByArgs",['$http', function($http){
	return {
		retrieveServicePostByArgs: function(url, arg) {
			console.log(url, arg);
			return $http.post(url, arg);
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