angular.module("hvm")
.constant("getPssProjectUrl","http://localhost:8080/HVM/getPssProjectByName.sw")
.constant("getPssValuesUrl","http://localhost:8080/HVM/getPssValuesByPssPrjId.sw")
.controller("newAttrCtrl", function($scope, $http, searchServicePost, searchServiceGet, getPssProjectUrl, getPssValuesUrl) {

	//최종데이터
	$scope.result = {};
//	$scope.result = {
//			"pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장"}
//			,"pssValue":{"pssValueId":"pssValueId1","pssValueName":pssValueId1"}
//			,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
//			,"sbp":{"sbpId":"sbpId1","sbpName":"sbpName1"}
//			,"sbpActs":[
//				{
//					"sbpActId":"sbpActId1"
//					,"sbpActName":"spbActName1"
//					,"hvmAttrs": [
//						{
//							"hvmAttrId":"hvmAttrId1"
//							,hvmAttrName":"hvmAttrName1"
//							,"hvmAttrType":"hvmAttrType1"
//						}
//					]
//				}
//			]
//		}
	
	//pssPrj검색결과셋 
	$scope.pss_projects = [];
	//pssValue검색결과셋 
	$scope.pss_Values = [];
	//sbpPrj검색결과셋 
	$scope.sbp_projects = [];
	//sbpAct검색결과셋 
	$scope.sbp_Activities = [];
	
	$scope.searchPssPrj = function(){
		searchServicePost.search(getPssProjectUrl, $scope.result.pssPrj.pssPrjName).then(function(response){
			console.log('searchPssPrj : '+getPssProjectUrl + ", arg:" + $scope.result.pssPrj.pssPrjName + " -> " + response.data);
			$scope.pss_projects = response.data;
		})
	};
	$scope.clickSearchedPssPrjItem = function(item) {
		$scope.pss_projects.length = 0;
		$scope.result.pssPrj = item;
		searchServicePost.search(getPssValuesUrl, item.pssPrjId).then(function(response){
			console.log('searchPssValue : '+ getPssValuesUrl + " , arg : "+item.pssPrjId+" -> " + response.data);
			$scope.pss_Values = response.data;
		})
	}
	//SBP 
	$scope.searchSbpPrj = function(){
		var searchSbpPrjUrl = "http://localhost:8080/HVM/getSbpProject.sw?name=" + $scope.result.sbpPrj.sbpPrjName;
		searchServiceGet.search(searchSbpPrjUrl).success(function(data){
			console.log('searchSbpPrj : '+searchSbpPrjUrl + " -> " + data);
			$scope.sbp_projects = data;
		}).error(function(error){
			console.log(error)
		});
	};
	$scope.clickSearchedSbpPrjItem = function(item) {
		var searchSbpUrl = "http://localhost:8080/HVM/getSbp.sw?sbpPrjId=" + item.sbpPrjId;
		$scope.sbp_projects.length = 0;
		$scope.result.sbpPrj = item;
		searchServiceGet.search(searchSbpUrl).success(function(data){
			console.log('searchSbp : '+ searchSbpUrl + " -> " + data);
			$scope.sbp_Sbps = data;
		}).error(function(error){
			console.log(error)
		});
	};
	$scope.selectSbp = function(){
		var searchSbpActUrl = "http://localhost:8080/HVM/getSbpActivity.sw?sbpId=" + $scope.result.sbp.sbpName;
		searchServiceGet.search(searchSbpActUrl).success(function(data){
			console.log('searchSbpActivity : '+ searchSbpActUrl + " -> " + data);
			$scope.sbp_Activities = data;
		}).error(function(error){
			console.log(error)
		});
	};
	
	$scope.openModal = function(index) {
		$scope.result.selectActIndex = index;
		ngDialog.open({
			template:"./views/attribute.html"
			,scope: $scope
				});
	};
	
	$scope.saveHvmAttr = function(){
		console.log($scope.result);
		console.log(JSON.stringify($scope.result))
	};
	
//	$scope.$watch("sbpName", function(){
//		alert("selectd " + $scope.sbpName);
//	});
})
.service("searchServicePost",['$http', function($http){
	return {
		search: function(url, keywords) {
			console.log(url, keywords);
			return $http.post(url,{"searchKey": keywords});
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