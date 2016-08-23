angular.module("hvm")
.controller("newProjectCtrl", function($scope, $routeParams, $rootScope, $location, getEmptyProject, getEmptyAttribute, retrieveServicePost,searchServicePost, sbpProjectListApi) {

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
		
		$scope.result[0].pssPrjId = 'ff80818149f5a1160149f725886b001f';
		$scope.result[0].pssPrjName = 'Hair dryer PSS';
		
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
	
	
	
	
})
		