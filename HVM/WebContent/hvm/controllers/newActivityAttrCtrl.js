angular.module("hvm").controller(
		"newActAttrCtrl",
		function($scope, $routeParams,$rootScope, setServicePost, searchServicePost, searchServiceGet, getPssProjectUrl,
				getPssValuesUrl, getSbpProjectUrl, getSbpActivityUrl, setActivityAttributeUrl) {
			$scope.viewType = $routeParams.addType;
			$scope.message = "this is new Attr";

			// 최종데이터
			$scope.result = {};
			
			if ($rootScope.editObj != undefined && $rootScope.editObj != null) {
				console.log("Edit!! in : " + JSON.stringify($rootScope.editObj));
				$scope.result = $rootScope.editObj;
				$rootScope.editObj = null;
			}
			
//			$scope.result = {
//			"pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장","pssPrjPicture":"XXXX.jpg","pssPrjDesc":"XXX"}
//			,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
//			,"sbpActivity":{"sbpActId":"sbpActId1","sbpActName":sbpActName1", "sbpId":"sbpId1","sbpName":"sbpName1"}
//			,"pssValues":[
//				{
//					"pssValueId":"pssValueId1"
//					,"pssValueName":"pssValueId1"
//					,"hvmAttrs": [
//						{
//							"hvmAttrId":"hvmAttrId1"
//							,hvmAttrName":"hvmAttrName1"
//							,"hvmAttrType":"hvmAttrType1"
//						}
//					]
//				}
//			]
		//}

			// pssPrj검색결과셋
			$scope.pss_projects = [];
			// pssValue검색결과셋
			$scope.pss_Values = [];
			$scope.isValueFocus = false;
			
			// sbpPrj검색결과셋
			//$scope.sbp_projects = [];
			// sbpAct검색결과셋
			$scope.sbp_Activities = [];
			$scope.tempValue = {};
			$scope.isTempValueFocus = false;

			$scope.selectedValue;
			$scope.newAttribute = {};
			
			$scope.setActivityAttribute = function() {
				setServicePost.setObj(setActivityAttributeUrl,
						$scope.viewType, $scope.result).then(
						function(response) {
							console.log('setAttr : ' + setActivityAttributeUrl
									+ ", arg:"
									+ " -> "
									+ JSON.stringify($scope.result));
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
			$scope.clickSearchedSbpActivityItem = function(item) {
				$scope.result.sbpActivity = angular.copy(item);
			}
			$scope.setActivityFocus = function(isFocus) {
				$scope.isActivityFocus = isFocus;
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
			$scope.setTempValueFocus = function(isFocus) {
				$scope.isTempValueFocus = isFocus;
			}
			$scope.addValueItem = function (_value) {
				console.log("add value : " + JSON.stringify(_value));
				if ($scope.result.pssValues === undefined) {
					$scope.result.pssValues = [];
				}
				
			    var result = true;
			    angular.forEach($scope.result.pssValues, function(value, key) {
			    	if (_value.pssValueName == value.pssValueName) {
			    		console.log("aleady exist value! " + _value.pssValueName);
			    		result = false;
			    	}
			    	console.log("value : "+ JSON.stringify(value));
			    });
			    if (result) {
			    	$scope.result.pssValues.push(_value);
				}
			}
			$scope.removeValueItem = function(index) {
				$scope.result.pssValues[index].hvmAttrs =[];
				$scope.result.pssValues.splice(index, 1);
			}
			$scope.addValueName = function(){
				var _value = {};
				_value.pssValueName = $scope.tempValue.pssValueName;
				if ($scope.result.pssValues === undefined) {
					$scope.result.pssValues = [];
				}
			    var result = true;
			    angular.forEach($scope.result.pssValues, function(value, key) {
			    	if (_value.pssValueName == value.pssValueName) {
			    		console.log("aleady exist value! " + _value.pssValueName);
			    		result = false;
			    	}
			    	console.log("value : "+ JSON.stringify(value));
			    });
			    if (result) {
			    	$scope.result.pssValues.push(_value);
				}
			}
			$scope.openModal = function(value, valIndex) {
				$scope.selectedValue = value;
				$scope.selectedValue.valIndex = valIndex
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
			$scope.addAttributeToValue = function() {
				
				var valIndex = $scope.selectedValue.valIndex;
				
				console.log("valIndex : " + valIndex + JSON.stringify($scope.result.pssValues[valIndex]));
				
				if ($scope.result.pssValues[valIndex].hvmAttrs === undefined) {
					$scope.result.pssValues[valIndex].hvmAttrs = [];
				}
			    var result = true;
				angular.forEach($scope.result.pssValues[valIndex].hvmAttrs, function(value, key) {
					if ($scope.newAttribute.hvmAttrName == value.hvmAttrName) {
			    		console.log("aleady exist attribute! " + $scope.newAttribute.hvmAttrName);
			    		result = false;
			    	}
			    });
			    if (result) {
			    	console.log("insert attribute!!!!" + JSON.stringify($scope.newAttribute));
			    	$scope.result.pssValues[valIndex].hvmAttrs.push($scope.newAttribute);
				}
				$scope.newAttribute = {};
				console.log("newAttribute : "+ JSON.stringify($scope.newAttribute));
				console.log("result : "+ JSON.stringify($scope.result));
				$scope.closeModal();
			}
			$scope.removeAttributeItem = function(pIndex, index) {
				console.log("pIndex : "+pIndex);
				console.log("index : "+index);
				$scope.result.pssValues[pIndex].hvmAttrs.splice(index, 1);
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