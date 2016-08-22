angular.module("hvm")
.controller("newProjectCtrl", function($scope, $routeParams, $rootScope, $location, getEmptyProject, getEmptyAttribute, retrieveServicePost) {

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
	
	$scope.removeAttribute = function(attribute, index) {
		$scope.result[0].attributes.splice(index, 1)
	}

	
	
	
	
	$scope.openSbpProjectListModal = function() {
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
		