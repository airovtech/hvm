angular.module("hvm").controller(
		"newValAttrCtrl",
		function($scope, $routeParams,$rootScope,$location, setServicePost, searchServicePost, searchServiceGet, getPssProjectUrl,
				getPssValuesUrl, getSbpProjectUrl, getSbpActivityUrl, setValueAttributeUrl) {
			$scope.viewType = $routeParams.addType;
			$scope.message = "this is new Attr";

			// 최종데이터
			$scope.result = {};
			
			//수정중일때 어트리뷰트의 생성/삭제의 파악이 어려워, 수정중인 value 에 속한 모든 attr지우고 다시 생성한다.
			$scope.oldResult = null;
			
			if ($rootScope.editObj != undefined && $rootScope.editObj != null) {
				$scope.result = $rootScope.editObj;
				$scope.oldResult = angular.copy($rootScope.editObj);
				$rootScope.editObj = null;
			}
			console.log("result : " + JSON.stringify($scope.result));
			// $scope.result = {
			// "pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장"}
			// ,"pssValue":{"pssValueId":"pssValueId1","pssValueName":pssValueId1"}
			// ,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
			// ,"sbpActs":[
			// {
			// "sbpActId":"sbpActId1"
			// ,"sbpActName":"spbActName1"
			// ,"sbpId":"sbpId1"
			// ,"sbpName":"sbpName1"
			// ,"hvmAttrs": [
			// {
			// "hvmAttrId":"hvmAttrId1"
			// ,hvmAttrName":"hvmAttrName1"
			// ,"hvmAttrType":"hvmAttrType1"
			// }
			// ]
			// }
			// ]
			// }

			// pssPrj검색결과셋
			$scope.pss_projects = [];
			// pssValue검색결과셋
			$scope.pss_Values = [];
			$scope.isValueFocus = false;
			
			// sbpPrj검색결과셋
			//$scope.sbp_projects = [];
			// sbpAct검색결과셋
			$scope.sbp_Activities = [];
			$scope.tempActivity = {};
			$scope.isTempActivityFocus = false;

			$scope.selectedActivity;
			$scope.newAttribute = {};
			
			$scope.setValueAttribute = function() {
				
				
				
				
				
				setServicePost.setObj(setValueAttributeUrl,
						$scope.viewType, $scope.result, $scope.oldResult).then(
						function(response) {
							console.log('setAttr : ' + setValueAttributeUrl
									+ ", arg:"
									+ " -> "
									+ JSON.stringify($scope.result));
							$location.path("/valueList");
						})
			}
			
			$scope.searchPssPrj = function() {
				searchServicePost.search(getPssProjectUrl,
						$scope.result.pssPrj.pssPrjName).then(
						function(response) {
							console.log('searchPssPrj : ' + getPssProjectUrl
									+ ", arg:"
									+ $scope.result.pssPrj.pssPrjName + " -> "
									+ JSON.stringify(response.data));
							// 선택된 내용을 수정하였을 경우 기존 정보를 지운다
							if ($scope.result.pssPrj.pssPrjId) {
								$scope.result.pssPrj.pssPrjId = null;
							}
							$scope.pss_projects = response.data;
						})
			};
			$scope.clickSearchedPssPrjItem = function(item) {
				$scope.pss_projects.length = 0;
				$scope.result.pssPrj = item;
				searchServicePost.search(getPssValuesUrl, item.pssPrjId).then(
						function(response) {
							console.log('searchPssValue : ' + getPssValuesUrl
									+ " , arg : " + item.pssPrjId + " -> "
									+ JSON.stringify(response.data));
							$scope.pss_Values = response.data;
						})
			}
			$scope.blurPssPrjFocus = function() {
				if (!$scope.result.pssPrj.pssPrjId) {
					if ($scope.pss_projects.length = 0) {
						$scope.result.pssPrj.pssPrjId = null;
						$scope.result.pssPrj.pssPrjName = null;
						$scope.pss_Values = null;
					} else {
						$scope.pss_projects.length = 0;
						$scope.result.pssPrj.pssPrjId = null;
						$scope.result.pssPrj.pssPrjName = null;
						$scope.pss_Values = null;
					}
				}
			}
			$scope.clickSearchedPssValueItem = function(item) {
				$scope.result.pssValue = angular.copy(item);
			}
			$scope.setValueFocus = function(isFocus) {
				$scope.isValueFocus = isFocus;
			}
			//SBP 
			$scope.searchSbpPrj = function(){
				var searchSbpPrjUrl = getSbpProjectUrl + "?name=" + $scope.result.sbpPrj.sbpPrjName;
				searchServiceGet.search(searchSbpPrjUrl).success(function(data){
					console.log('searchSbpPrj : '+searchSbpPrjUrl + " -> " + JSON.stringify(data));
					// 선택된 내용을 수정하였을 경우 기존 정보를 지운다
					if ($scope.result.sbpPrj.sbpPrjId) {
						$scope.result.sbpPrj.sbpPrjId = null;
					}
					$scope.sbp_projects = data;
				}).error(function(error){
					console.log(error)
				});
			};
			$scope.clickSearchedSbpPrjItem = function(item) {
				$scope.sbp_projects.length = 0;
				$scope.result.sbpPrj = item;
				var searchSbpActivityUrl = getSbpActivityUrl + "?sbpPrjId=" + item.sbpPrjId;
				searchServiceGet.search(searchSbpActivityUrl).success(function(data){
					console.log('searchSbp : '+ searchSbpActivityUrl + " -> " + JSON.stringify(data));
					$scope.sbp_Activities = data;
				}).error(function(error){
					console.log(error)
				});
			}
			$scope.blurSbpPrjFocus = function() {
				if (!$scope.result.sbpPrj.sbpPrjId) {
					if ($scope.sbp_projects.length = 0) {
						$scope.result.sbpPrj.sbpPrjId = null;
						$scope.result.sbpPrj.sbpPrjName = null;
						$scope.sbp_Activities = null;
					} else {
						$scope.sbp_projects.length = 0;
						$scope.result.sbpPrj.sbpPrjId = null;
						$scope.result.sbpPrj.sbpPrjName = null;
						$scope.sbp_Activities = null;
					}
				}
			}
			$scope.clickSearchedTempActivityItem = function(item) {
				$scope.tempActivity = angular.copy(item);
				console.log("tempActivityObj : " + JSON.stringify($scope.tempActivity));
			}
			$scope.setTempActivityFocus = function(isFocus) {
				$scope.isTempActivityFocus = isFocus;
			}
			$scope.addActivityItem = function (activity) {
				console.log("add activity : " + JSON.stringify(activity));
				if ($scope.result.sbpActs === undefined) {
					$scope.result.sbpActs = [];
				}
				
			    var result = true;
			    angular.forEach($scope.result.sbpActs, function(value, key) {
			    	if (activity.sbpActName == value.sbpActName) {
			    		console.log("aleady exist activity! " + activity.sbpActName);
			    		result = false;
			    	}
			    	console.log("value : "+ JSON.stringify(value));
			    });
			    if (result) {
			    	$scope.result.sbpActs.push(activity);
				}
			}
			$scope.removeActivityItem = function(index) {
				$scope.result.sbpActs[index].hvmAttrs =[];
				$scope.result.sbpActs.splice(index, 1);
			}
			$scope.addActivityName = function(){
				var activity = {};
				activity.sbpActName = $scope.tempActivity.sbpActName;
				if ($scope.result.sbpActs === undefined) {
					$scope.result.sbpActs = [];
				}
			    var result = true;
			    angular.forEach($scope.result.sbpActs, function(value, key) {
			    	if (activity.sbpActName == value.sbpActName) {
			    		console.log("aleady exist activity! " + activity.sbpActName);
			    		result = false;
			    	}
			    	console.log("value : "+ JSON.stringify(value));
			    });
			    if (result) {
			    	$scope.result.sbpActs.push(activity);
				}
			}
			$scope.openModal = function(activity, actIndex) {
				$scope.selectedActivity = activity;
				$scope.selectedActivity.actIndex = actIndex
				$scope.modal_style = {
			        'display' : 'block'
			      };
			}
			$scope.closeModal = function() {
				$scope.modal_style = {
			        'display' : 'none'
			      };
				$scope.newAttribute = {};
			}
			$scope.addAttributeToActivity = function() {
				
				var actIndex = $scope.selectedActivity.actIndex;
				
				console.log("actIndex : " + actIndex + JSON.stringify($scope.result.sbpActs[actIndex]));
				
				if ($scope.result.sbpActs[actIndex].hvmAttrs === undefined) {
					$scope.result.sbpActs[actIndex].hvmAttrs = [];
				}
			    var result = true;
				angular.forEach($scope.result.sbpActs[actIndex].hvmAttrs, function(value, key) {
					if ($scope.newAttribute.hvmAttrName == value.hvmAttrName) {
			    		console.log("aleady exist attribute! " + $scope.newAttribute.hvmAttrName);
			    		result = false;
			    	}
			    });
			    if (result) {
			    	console.log("insert attribute!!!!" + JSON.stringify($scope.newAttribute));
			    	$scope.result.sbpActs[actIndex].hvmAttrs.push($scope.newAttribute);
				}
				$scope.newAttribute = {};
				console.log("newAttribute : "+ JSON.stringify($scope.newAttribute));
				console.log("result : "+ JSON.stringify($scope.result));
				$scope.closeModal();
			}
			$scope.removeAttributeItem = function(pIndex, index) {
				console.log("pIndex : "+pIndex);
				console.log("index : "+index);
				$scope.result.sbpActs[pIndex].hvmAttrs.splice(index, 1);
			}
			$scope.getValidStyle = function() {
				if ($scope.result.pssPrj && $scope.result.pssPrj.pssPrjName 
						&& $scope.result.pssValue && $scope.result.pssValue.pssValueName
							&& $scope.result.sbpActs) {
					var isValid = false;
					for (var i=0; i < $scope.result.sbpActs.length; i++) {
						var act = $scope.result.sbpActs[i];
						if (act.hvmAttrs && act.hvmAttrs.length != 0) {
							console.log(i);
							isValid = true;
							//break;
						} else {
							isValid = false;
						}
					}
					if (isValid) {
						return {};
					} else {
						return {
							"cursor": "not-allowed",
						  	"pointer-events": "none",
						  	"color": "grey",
						  	"background-color": "#b9cb08"
						};
					}
				} else {
					console.log("inValid");
					return {
						"cursor": "not-allowed",
					  	"pointer-events": "none",
					  	"color": "grey",
					  	"background-color": "#b9cb08"
					};
				}
			}
			function sleep(num) { //[1/1000초]
				var now = new Date();
				var stop = now.getTime() + num;
				while (true) {
					now = new Date();
					if (now.getTime() > stop)
						return;
				}
			}

		})