angular.module("hvm")
.controller("newAttrCtrl", function($scope, $routeParams) {
	$scope.viewType = $routeParams.addType;
	$scope.message = "this is new Attr";
	
	//최종데이터
	$scope.result = {};
//	$scope.result = {
//			"pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장"}
//			,"pssValue":{"pssValueId":"pssValueId1","pssValueName":pssValueId1"}
//			,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
//			,"sbpActs":[
//				{
//					"sbpActId":"sbpActId1"
//					,"sbpActName":"spbActName1"
//					,"sbpId":"sbpId1"
//					,"sbpName":"sbpName1"
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
	
	$scope.getInclude = function() {
		if ($scope.viewType === "value") {
			return "./views/new/valueNewAttr.html";
		} else if ($scope.viewType === "activity") {
			return "";
		} else {
			return "";
		}
	}
	
})