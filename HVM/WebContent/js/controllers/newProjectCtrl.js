angular.module("hvm")
.controller("newProjectCtrl", function($scope, $sce, $routeParams, $rootScope, $location, getEmptyProject, getEmptyAttribute
		, retrieveServicePost,searchServicePost, sbpProjectListApi, valueDetailFrameUrl, pssDetailFrameUrl) {

	retrieveServicePost.retrieve(getEmptyProject, null, null, null, null).then(function(response){
		$scope.result = response.data;
	})
	$scope.addAttribute = function() {
		retrieveServicePost.retrieve(getEmptyAttribute, null, null, null, null).then(function(response){
			var attribute = response.data[0];
			attribute.prjId = $scope.result[0].id;
			$scope.result[0].attributes.push(attribute);
		})
	}

	
	$scope.trustSrc = function(type) {
		if (type === "value") {
		    return $sce.trustAsResourceUrl(valueDetailFrameUrl + $scope.result[0].pssPrjId);
		} else if (type === "pss") {
		    return $sce.trustAsResourceUrl(pssDetailFrameUrl + $scope.result[0].pssPrjId);
		} else if (type === "sbp") {
		    return $sce.trustAsResourceUrl("http://sbp.pssd.or.kr/sbp/listForHvm.jsp?hvm=true&memberId=sbpAdmin&sPUID="+$scope.selectPuid+"&sProjectName="+$scope.selectSbpName);
		} else if (type === "sbpView") {
		    return $sce.trustAsResourceUrl("http://am.pssd.or.kr:9095/AMT_SYSTEM/otherActivityUpdate.runa?user_seq=1&sysType=SBP&operType=SR02&activity_name="+$scope.selectedActivityId+"&united_user_seq=tester&user_id=tester&user_name=tester&project_name=test&project_puid=test");
		}
	}

	$scope.deletePssProject = function() {
		$scope.result[0].pssPrjId = null;
		$scope.result[0].pssPrjName = null;
	}
	$scope.deleteSbpProject = function() {
		$scope.result[0].sbpPrjId = null;
		$scope.result[0].sbpPrjName = null;
	}
	//$scope.sbpPrjId = null;
	$scope.selectedSbpProject = function(sbpProject, index) {
		$scope.sbpPrjId = sbpProject.project_puid;
		$scope.sbpPrjName = sbpProject.project_name;
		//alert(sbpProject.project_puid);
	}
	
	$scope.selectSbpProjectComplete = function() {
		$scope.result[0].sbpPrjId = $scope.sbpPrjId;
		$scope.result[0].sbpPrjName = $scope.sbpPrjName;
		$scope.sbpPrjId = null;
		$scope.sbpPrjName = null;
		$scope.sbpProjectList_modal_style = {
		        'display' : 'none'
		    };
		console.log('newProjectCtrl : saveSbpProject : ', $scope.result[0]);
	}
	
	$scope.searchSbpPrj = function() {
		searchServicePost.search(sbpProjectListApi, null).then(
			function(response) {
				$scope.sbp_projects = response.data.list;
				console.log('newProjctCtrl : searchSbpPrj : ',$scope.sbp_projects);
			}
		)
	}

	//$scope.searchSbpPrj();
	
	$scope.removeAttribute = function(attribute, index) {
		$scope.result[0].attributes.splice(index, 1)
	}
	
	//pss modal 
	$scope.openPssProjectListModal = function() {
		
		$scope.result[0].pssPrjId = '37ef256d5640b9b9015640b9b9ef0000';
		$scope.result[0].pssPrjName = '[다비치]안경원 서비스 경험디자인';
		
//		$scope.searchPssPrj();
//		$scope.pssProjectList_modal_style = {
//	        'display' : 'block'
//	    };
	}
	$scope.closePssProjectListModal = function() {
		$scope.pssProjectList_modal_style = {
	        'display' : 'none'
	    };
	}
	$scope.selectPssProjectListModal = function() {
		$scope.pssProjectList_modal_style = {
	        'display' : 'none'
	    };
		console.log('select sbp!!!');
	}
	
	//sbp modal 
	$scope.openSbpProjectListModal = function() {
		$scope.searchSbpPrj();
		$scope.sbpProjectList_modal_style = {
				'display' : 'block'
		};
	}
	$scope.closeSbpProjectListModal = function() {
		$scope.sbpProjectList_modal_style = {
				'display' : 'none'
		};
	}
	$scope.selectSbpProjectListModal = function() {
		$scope.sbpProjectList_modal_style = {
				'display' : 'none'
		};
		console.log('select sbp!!!');
	}
	//value tree

	$scope.findElementByTextNPaintOnValueTreeModal = function(text, colorCode) {
		$($('#valueTree').contents().find('span:contains("'+text+'")').filter('[class="js_action_select_value"]')[0]).parent().parent().css('background-color',colorCode);
	}
	$scope.getSelectedValueElementOnValueTreeModal = function() {
		return $('#valueTree').contents().find('#selectedValue')[0];
	}
	$scope.openValueTreeModal = function(attribute) {
		$scope.selectedAttributeForValue = attribute;
		if (attribute.valueName) {
			$scope.findElementByTextNPaintOnValueTreeModal(attribute.valueName, '#00FF00');
			//$('#valueTree').contents().find('#selectedValue')[0].value = attribute.valueName;
			$scope.getSelectedValueElementOnValueTreeModal().value = attribute.valueName;
		}
		$scope.valueTree_modal_style = {
	        'display' : 'block'
	    };
	}
	$scope.closeValueTreeModal = function() {
		$scope.findElementByTextNPaintOnValueTreeModal($scope.selectedAttributeForValue.valueName, '#EAE8E6');
		$scope.selectedAttributeForValue = null;
		$scope.getSelectedValueElementOnValueTreeModal().value = null;
		$scope.valueTree_modal_style = {
	        'display' : 'none'
	    };
	}
	$scope.selectValueTreeModal = function() {
		if($scope.selectedAttributeForValue) {
			$scope.selectedAttributeForValue.valueName = $('#valueTree').contents().find('#selectedValue')[0].value;
			$scope.getSelectedValueElementOnValueTreeModal().value = null;
		}
		$scope.findElementByTextNPaintOnValueTreeModal($scope.selectedAttributeForValue.valueName, '#EAE8E6');
		$scope.selectedAttributeForValue = null;

		$scope.valueTree_modal_style = {
	        'display' : 'none'
	    };
	}
})
		