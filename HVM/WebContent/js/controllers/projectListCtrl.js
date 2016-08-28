angular.module("hvm")
.controller("projectListCtrl", function($scope, $sce, $routeParams, $cookies, $location, $rootScope, getProjectListUrl
		, getProjectListSizeUrl, retrieveServicePost,removeProjectPost, imageServerUrl, getAttributeListUrl
		, getAttributeListSizeUrl, removeProjectUrl, getPagingInfoPost, getPagingInfoUrl, valueDetailFrameUrl) {

	
	$scope.trustSrc = function(type) {
		if (type === "valueView") {
		    return $sce.trustAsResourceUrl(valueDetailFrameUrl + $scope.selectedValueId);
		} else if (type === "sbpView") {
		    //return $sce.trustAsResourceUrl("http://sbp.pssd.or.kr/sbp/listForHvm.jsp?hvm=true&memberId=sbpAdmin&sPUID="+$scope.result[0].sbpPrjId+"&sProjectName="+$scope.result[0].sbpPrjName);
		    //return $sce.trustAsResourceUrl("http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?hvm=true&memberId=&sPUID="+$scope.selectedSbpId+"&sProjectName="+$scope.selectedSbpName);
		    
			if ($scope.selectedSbpId != null && $scope.selectedSbpId != undefined)
				return $sce.trustAsResourceUrl("http://sbp.pssd.or.kr/sbp/panel8ForHvm.jsp?seq="+$scope.selectedSbpId+"&hvm=true&memberId=sbpAdmin&sPUID=&docTitle="+$scope.selectedSbpName+"&sProjectName="+$scope.selectedSbpPrjName);

		} else if (type === "activityView") {
		    return $sce.trustAsResourceUrl("http://am.pssd.or.kr:9095/AMT_SYSTEM/otherActivityUpdate.runa?user_seq=1&sysType=SBP&operType=SR02&activity_name="+$scope.selectedActivityId+"&united_user_seq=tester&user_id=tester&user_name=tester&project_name=test&project_puid=test");
		}
	}
	
	
	//value view modal
	$scope.findElementByTextNPaintOnValueTreeModal = function(text, colorCode) {
		$($('#valueView').contents().find('span:contains("'+text+'")').filter('[class="js_action_select_value"]')[0]).parent().parent().css('background-color',colorCode);
	}
	
	$scope.openValueViewModal = function(pssPrjId, valueName) {
		
		//$scope.refreshValueView = true;
		$scope.selectedValueName = valueName;
		$scope.selectedValueId = pssPrjId;
		$scope.valueView_modal_style = {
	        'display' : 'block'
	    };
		$scope.findElementByTextNPaintOnValueTreeModal(valueName, '#00FF00');
	}
	$scope.closeValueViewModal = function() {
		$scope.findElementByTextNPaintOnValueTreeModal($scope.selectedValueName, '#EAE8E6');
		$scope.selectedValueName = null;
		$scope.valueView_modal_style = {
	        'display' : 'none'
	    };
	}
	
	
	//sbp view modal
	$scope.openSbpViewModal = function(sbpId, sbpName, sbpPrjName) {
		$scope.refreshSbpView = true;
		$scope.selectedSbpId = sbpId;
		$scope.selectedSbpName = sbpName;
		$scope.selectedSbpPrjName = sbpPrjName;
		$scope.sbpView_modal_style = {
				'display' : 'block'
		};
	}
	$scope.closeSbpViewModal = function() {
		//$scope.refreshActView = true;
		$scope.sbpView_modal_style = {
				'display' : 'none'
		};
	}
	
	//act view modal
	$scope.openActivityViewModal = function(attribute) {
		$scope.refreshActView = true;
		$scope.selectedActivityId = attribute.activityId;
		$scope.activityView_modal_style = {
				'display' : 'block'
		};
	}
	$scope.closeActivityViewModal = function() {
		//$scope.refreshActView = true;
		$scope.activityView_modal_style = {
				'display' : 'none'
		};
	}
	
	$scope.viewType = $cookies.get("nowViewType");
	if ($scope.viewType == undefined) {
		$scope.viewType = "PSS";
		$scope.showProjectList = true;
		$scope.showAttributeList = false;
	}
	
	
	$scope.selectedItem = $scope.viewType;
	
	$scope.selectViewType = function(index) {
		//$scope.$apply(function(){
		//})
		
		$scope.selectedItem = $scope.selectItem[index];
		$scope.viewType = $scope.selectItem[index];
		$cookies.put("nowViewType",$scope.selectItem[index]);
		$scope.showViewTypeList = false;
		
		if ($scope.viewType == 'PSS') {
			$scope.showProjectList = true;
			$scope.showAttributeList = false;
		} else {
			
			var orderColumn = null;
			
			if ($scope.viewType == 'Value') {
				orderColumn = 'valueName';
			} else if ($scope.viewType == 'Activity') {
				orderColumn = 'activityName';
			} else if ($scope.viewType == 'Attribute') {
				orderColumn = 'attributeName';
			}
			
			$scope.clickAttrPageNo(0, orderColumn)
			
			$scope.showProjectList = false;
			$scope.showAttributeList = true;
		}
		
	}
	$scope.editProject = function(project) {
		$location.path('/newProject');
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
	
	$scope.getPrjPagingCountStyle = function(count) {
		//alert($scope.prjPageNo);
		if (count-1 == $scope.prjPageNo) {
			return 'pageSelected'
		} else {
			return ''
		}
	}
	
	$scope.clickPrjPrevPage = function() {
		$scope.clickPrjPageNo($scope.prjPrevPage);
	}
	$scope.clickPrjNextPage = function() {
		$scope.clickPrjPageNo($scope.prjNextPage);
	}
	$scope.clickPrjPageNo = function(pNo) {
		$scope.prjPageNo = pNo;
		
		retrieveServicePost.retrieve(getProjectListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalPages = Math.ceil($scope.totalSize/$scope.prjPageSize);
			console.log('proejctListCtrl !!!!: ' , $scope.totalPages,$scope.totalSize, $scope.prjPageSize);
			
			getPagingInfoPost.getPagingInfo(getPagingInfoUrl, totalSize, pNo+1, $scope.prjPageSize).then(function(response){
				var pagingInfo = response.data[0];
				$scope.projectPagingCounts = [];
				for (var i = pagingInfo.startPageNo ; i <= pagingInfo.endPageNo; i++) {
					$scope.projectPagingCounts.push(i);
				}
				$scope.prjPrevPage = pagingInfo.prevPageNo-1;
				$scope.prjNextPage = pagingInfo.nextPageNo-1;
			})
			
			
		})
		retrieveServicePost.retrieve(getProjectListUrl, $scope.viewType, $scope.keywords, $scope.prjPageSize, $scope.prjPageNo).then(function(response){
			$scope.result = response.data;
			console.log('@@@@@@@@@@@@@@@@@@ ',JSON.stringify($scope.result[0]))
		})
		
	}
	$scope.clickPrjPageNo(0);
	

	
	//attribute page pagenation
	$scope.attrPageSize = 20;
	$scope.attrPageNo = 0;
	
	$scope.attrResult = [];
	
	$scope.getAttrPagingCountStyle = function(count) {
		//alert($scope.prjPageNo);
		if (count-1 == $scope.attrPageNo) {
			return 'pageSelected'
		} else {
			return ''
		}
	}
	
	$scope.clickAttrPrevPage = function() {
		$scope.clickAttrPageNo($scope.attrPrevPage);
	}
	$scope.clickAttrNextPage = function() {
		$scope.clickAttrPageNo($scope.attrNextPage);
	}
	
	$scope.clickAttrPageNo = function(pNo, orderColumn) {
		
		$scope.attrPageNo = pNo;
		
		retrieveServicePost.retrieve(getAttributeListSizeUrl, $scope.viewType, $scope.keywords).then(function(response){
			var totalSize = response.data.totalSize;
			$scope.totalAttrPages = Math.ceil(totalSize/$scope.attrPageSize);
			
			getPagingInfoPost.getPagingInfo(getPagingInfoUrl, totalSize, pNo+1, $scope.attrPageSize).then(function(response){
				var pagingInfo = response.data[0];
				$scope.attrPagingCounts = [];
				for (var i = pagingInfo.startPageNo ; i <= pagingInfo.endPageNo; i++) {
					$scope.attrPagingCounts.push(i);
				}
				$scope.attrPrevPage = pagingInfo.prevPageNo-1;
				$scope.attrNextPage = pagingInfo.nextPageNo-1;
			})
			
		})
		retrieveServicePost.retrieve(getAttributeListUrl, $scope.viewType, $scope.keywords, $scope.attrPageSize, $scope.attrPageNo, null, orderColumn, false).then(function(response){
			$scope.attrResult = response.data;
			//console.log('projectListCtrl : resultAttribute : ',JSON.stringify($scope.attrResult))
		})
	}
	//$scope.clickAttrPageNo(0);
	
	if ($scope.viewType == 'PSS') {
		$scope.showProjectList = true;
		$scope.showAttributeList = false;
	} else {
		
		if ($scope.viewType == 'Value') {
			orderColumn = 'valueName';
		} else if ($scope.viewType == 'Activity') {
			orderColumn = 'activityName';
		} else if ($scope.viewType == 'Attribute') {
			orderColumn = 'attributeName';
		}
		
		$scope.clickAttrPageNo(0, orderColumn)
		
		
		$scope.showProjectList = false;
		$scope.showAttributeList = true;
	}
	
	
	//$("#dragableDiv").draggable();
	
	
})