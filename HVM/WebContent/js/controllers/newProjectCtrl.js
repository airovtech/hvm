angular.module("hvm")
.controller("newProjectCtrl", function($scope, $sce, $routeParams, $rootScope, $location, getEmptyProject, getEmptyAttribute
		, retrieveServicePost,searchServicePost, pssProjectListApi, sbpProjectListApi, valueDetailFrameUrl, pssDetailFrameUrl
		,getProjectListUrl, getSkkupssPssProjectListUrl, setHvmProjectUrl, setServicePost) {

	
	
	$scope.$watch('result[0].sbpPrjName', function(newVal, oldVal){
		$scope.getSbpPrjSbpName()
    }, true);
	$scope.$watch('result[0].attributes', function(newVal, oldVal){
		$scope.getSbpPrjSbpName()
    }, true);
	
	$scope.getSbpPrjSbpName = function() {
		
		var project = $scope.result[0];
		
		var attrs = project.attributes;
		var sbpGroupList = null;
		if (attrs != null && attrs.length != 0) {
			var sbpPrjName = project.sbpPrjName;
		
			for (var j = 0; j < attrs.length; j++) {
//				var sbpName = attrs[j].sbpName == null ? '' : attrs[j].sbpName;
				var sbpName = attrs[j].sbpName;
				if (sbpName != null) {
					if (sbpGroupList == null)
						sbpGroupList = [];
					if (sbpName != null && sbpGroupList.indexOf(sbpPrjName+"_"+sbpName) == -1) {
						sbpGroupList.push(sbpPrjName+"_"+sbpName);
					}
				}
			}
		}
		$scope.sbpGroupList = sbpGroupList;
	}
	$scope.getSbpPrjSbpNameNo = function(sbpName) {
		
		var project = $scope.result[0];
		return $scope.sbpGroupList.indexOf(project.sbpPrjName+"_"+sbpName) == -1 ? null : 'No.'+($scope.sbpGroupList.indexOf(project.sbpPrjName+"_"+sbpName) + 1); 
	
	}
	
	$scope.editProject = function(psId) {
		retrieveServicePost.retrieve(getProjectListUrl, '', null, 1, 0, psId).then(function(response){
			if (response.data) {
				$scope.result[0] = response.data[0];
			} else {
				//skupss 데이터베이스에서 정보를 가져온다
				retrieveServicePost.retrieve(getSkkupssPssProjectListUrl, null, null, null, null, psId).then(function(response){
					if (response.data) {
						$scope.result[0].pssPrjId = response.data[0].id;
						$scope.result[0].pssPrjName = response.data[0].name;
						$scope.result[0].pssPrjDescription = response.data[0].description;
						$scope.result[0].pssPrjPicture = response.data[0].picture;
					} else {
					} 
				})
			}
		})
	}
	if ($routeParams.psId != 'new') {
		$scope.editProject($routeParams.psId);
	}
	$scope.cancel = function() {
		$location.path('/projectList');
	}
	
	$scope.pssProjectListUrl = pssProjectListApi;
	
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
	$scope.$on('selectValuePostMessage', function(event, args) {
		//callType||valueText
		
		$scope.selectedPssValueName = args.data.split("||")[1];
		
		$scope.confirmTitle = 'PSS';
		$scope.confirmText = "'"+args.data.split("||")[1]+"' 를(을) 선택하시겠습니까?" 
		
		$scope.confirmActionArray = [$scope.selectValueTreeModal, $scope.closeConfirmModal]
		
		$scope.openConfirmModal();
		
	});
	$scope.$on('selectPssPrjPostMessage', function(event, args) {
		//callType||psId||psame
		
		$scope.selectedPssPrjId = args.data.split("||")[1];
		$scope.selectedPssPrjName = args.data.split("||")[2];
		
		
		$scope.confirmTitle = 'PSS';
		$scope.confirmText = "'"+args.data.split("||")[2]+"' 를(을) 선택하시겠습니까?" 
		
		$scope.confirmActionArray = [$scope.selectPssProjectListModal, $scope.closeConfirmModal]
		
		$scope.openConfirmModal();
		
	});
	$scope.$on('selectSbpPostMessage', function(event, args) {
		//2013 12 17_to be(컬러링)||543||51108||UA_s20601||확인받기
		//sbpName||sbpId(seqId)|| ... ||activityId(activityName)||activity
		
		//console.log('newProjectCtrl selectSbpPostMessage : ', args)
		
		$scope.tempSbpName = args.data.split("||")[0];
		$scope.tempSbpId = args.data.split("||")[1];
		$scope.tempActivityId = args.data.split("||")[3];
		$scope.tempActivityName = args.data.split("||")[4];
		
		
		$scope.confirmTitle = 'SBP';
		$scope.confirmText = "'"+args.data.split("||")[4]+"' 를(을) 선택하시겠습니까?" 
		
		$scope.confirmActionArray = [$scope.selectSbpTreeModal, $scope.closeConfirmModal]
		
		$scope.openConfirmModal();
		
	});
	
	$scope.saveNewProject = function() {
		setServicePost.setObj(setHvmProjectUrl, null, $scope.result[0]).then(function(response){
			$location.path('/projectList',true);
		})
	}
	
	
	$scope.trustSrc = function(type) {
		if (type === "value") {
		    return $sce.trustAsResourceUrl(valueDetailFrameUrl + $scope.result[0].pssPrjId);
		} else if (type === "pss") {
		    return $sce.trustAsResourceUrl(pssDetailFrameUrl + $scope.result[0].pssPrjId);
		} else if (type === "sbp") {
		    return $sce.trustAsResourceUrl("http://sbp.pssd.or.kr/sbp/listForHvm.jsp?hvm=true&memberId=sbpAdmin&sPUID="+$scope.result[0].sbpPrjId+"&sProjectName="+$scope.result[0].sbpPrjName);
		} else if (type === "sbpView") {
		    return $sce.trustAsResourceUrl("http://am.pssd.or.kr:9095/AMT_SYSTEM/otherActivityUpdate.runa?user_seq=1&sysType=SBP&operType=SR02&activity_name="+$scope.selectedActivityId+"&united_user_seq=tester&user_id=tester&user_name=tester&project_name=test&project_puid=test");
		}
	}

	$scope.deletePssProject = function() {
		$scope.result[0].pssPrjId = null;
		$scope.result[0].pssPrjName = null;
		
		if ($scope.result[0].attributes) {
			for (var i =0; i < $scope.result[0].attributes.length; i++) {
				$scope.result[0].attributes[i].valueId = null;
				$scope.result[0].attributes[i].valueName = null;
			}
		}
	}
	$scope.deleteSbpProject = function() {
		$scope.result[0].sbpPrjId = null;
		$scope.result[0].sbpPrjName = null;
		
		if ($scope.result[0].attributes) {
			for (var i =0; i < $scope.result[0].attributes.length; i++) {
				$scope.result[0].attributes[i].sbpId = null;
				$scope.result[0].attributes[i].sbpName = null;
				$scope.result[0].attributes[i].activityId = null;
				$scope.result[0].attributes[i].activityName = null;
			}
		}
	}
	//$scope.sbpPrjId = null;
	$scope.selectedSbpProject = function(sbpProject, index) {
		$scope.sbpPrjId = sbpProject.project_puid;
		$scope.sbpPrjName = sbpProject.project_name;
		
		$scope.confirmTitle = 'SBP';
		$scope.confirmText = "'"+sbpProject.project_name+"' 를(을) 선택하시겠습니까?" 
		
		$scope.confirmActionArray = [$scope.selectSbpProjectComplete, $scope.closeConfirmModal]
		
		$scope.openConfirmModal();
		
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
	
	//pssProject modal 

	$scope.getSelectedPssProjectElementOnModal = function() {
		return $('#pssProjectList').contents().find('#selectedPssPrjId')[0];
	}
	
	$scope.openPssProjectListModal = function() {
		$scope.pssProjectList_modal_style = {
				'display' : 'block'
		};
	}
	$scope.closePssProjectListModal = function() {
		$scope.refreshPss = true;
		$scope.pssProjectList_modal_style = {
				'display' : 'none'
		};
	}
	$scope.selectPssProjectListModal = function(arg) {
		
		var psId = null;
		if (arg) {
			psId = arg;
		} else {
			psId = $scope.getSelectedPssProjectElementOnModal().value;
		}
		$scope.getSelectedPssProjectElementOnModal().value = null;
		
		retrieveServicePost.retrieve(getProjectListUrl, '', null, 1, 0, psId).then(function(response){
			if (response.data) {
				$scope.result[0] = response.data[0];
				console.log('newProjectCtrl selectPssProjectList ',JSON.stringify($scope.result))
			} else {
				//skupss 데이터베이스에서 정보를 가져온다
				retrieveServicePost.retrieve(getSkkupssPssProjectListUrl, null, null, null, null, psId).then(function(response){
					if (response.data) {
						//$scope.result = response.data;
						console.log('newProjectCtrl selectPssProjectList SKKUPSS  : ',response)
						$scope.result[0].pssPrjId = response.data[0].id;
						$scope.result[0].pssPrjName = response.data[0].name;
						$scope.result[0].pssPrjDescription = response.data[0].description;
						$scope.result[0].pssPrjPicture = response.data[0].picture;
						
						console.log('newProjectCtrl selectPssProjectList SKKUPSS2  : ',JSON.stringify($scope.result[0]))
					} else {
						console.log('newProjectCtrl selectPssProjectList SKKUPSS Not Exist...');
					} 
				})
			}
		})
		
		
		$scope.pssProjectList_modal_style = {
				'display' : 'none'
		};
		$scope.refreshPss = true;
	}
	
	//sbpProject modal 
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
	
	//value tree modal
	$scope.findElementByTextNPaintOnValueTreeModal = function(text, colorCode) {
		$($('#valueTree').contents().find('span:contains("'+text+'")').filter('[class="js_action_select_value"]')[0]).parent().parent().css('background-color',colorCode);
	}
	$scope.getSelectedValueElementOnValueTreeModal = function() {
		return $('#valueTree').contents().find('#selectedValue')[0];
	}
	$scope.openValueTreeModal = function(attribute) {
		$scope.selectedAttributeForValue = attribute;
		if (attribute.valueName) {
//			$scope.findElementByTextNPaintOnValueTreeModal(attribute.valueName, '#00FF00');
//			//$('#valueTree').contents().find('#selectedValue')[0].value = attribute.valueName;
//			$scope.getSelectedValueElementOnValueTreeModal().value = attribute.valueName;
		}
		
		$($('#valueTree').contents().find('body')).focus();
		
		$scope.valueTree_modal_style = {
	        'display' : 'block'
	    };
	}
	$scope.closeValueTreeModal = function() {
//		$scope.findElementByTextNPaintOnValueTreeModal($scope.selectedAttributeForValue.valueName, '#EAE8E6');
//		$scope.findElementByTextNPaintOnValueTreeModal($scope.getSelectedValueElementOnValueTreeModal().value, '#EAE8E6');
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
		//$scope.findElementByTextNPaintOnValueTreeModal($scope.selectedAttributeForValue.valueName, '#EAE8E6');
		$scope.selectedAttributeForValue = null;

		$scope.valueTree_modal_style = {
	        'display' : 'none'
	    };
	}
	
	
	//sbp tree modal
	$scope.openSbpTreeModal = function(attribute) {
		$scope.selectedAttributeForSbp = attribute;

		$scope.tempSbpName = null;
		$scope.tempSbpId = null;
		$scope.tempActivityId = null;
		$scope.tempActivityName = null;
		
		$scope.sbpTree_modal_style = {
	        'display' : 'block'
	    };
	}
	$scope.closeSbpTreeModal = function() {
		$scope.selectedAttributeForSbp = null;

		$scope.tempSbpName = null;
		$scope.tempSbpId = null;
		$scope.tempActivityId = null;
		$scope.tempActivityName = null;
		
		$scope.refresh = true;
		$scope.sbpTree_modal_style = {
	        'display' : 'none'
	    };
	}
	$scope.selectSbpTreeModal = function() {

		if($scope.selectedAttributeForSbp) {
			$scope.selectedAttributeForSbp.sbpName = $scope.tempSbpName;
			$scope.selectedAttributeForSbp.sbpId = $scope.tempSbpId;
			$scope.selectedAttributeForSbp.activityId = $scope.tempActivityId;
			$scope.selectedAttributeForSbp.activityName = $scope.tempActivityName;
		}
		
		$scope.selectedAttributeForSbp = null;
		$scope.refresh = true;
		$scope.sbpTree_modal_style = {
	        'display' : 'none'
	    };
		console.log('select sbp!!!' , $scope.result[0]);
	}

	//confirmPssPrj_modal
	
	$scope.openConfirmModal = function() {
		$scope.confirm_modal_style = {
			'display' : 'block'
		};
	}
	$scope.closeConfirmModal = function() {
		$scope.clearConfirm()
		$scope.confirm_modal_style = {
			'display' : 'none'
		};
	}
	$scope.clearConfirm = function() {

		$scope.confirmTitle = null;
		$scope.confirmText = null;
		$scope.confirmAction = null;
		$scope.confirmActionArray = null;
	}
	$scope.confirmModal = function() {
		
		if ($scope.confirmAction) {
			$scope.confirmAction();
		}
		if ($scope.confirmActionArray) {
			for (var i=0 ; i < $scope.confirmActionArray.length; i++) {
				$scope.confirmActionArray[i]();
			}
		}
		$scope.clearConfirm();
		
	}
	
})
		