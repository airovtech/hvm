angular.module("hvm").controller(
		"newAttrCtrl",
		function($scope, $routeParams) {
			$scope.viewType = $routeParams.addType;
			$scope.message = "this is new Attr";

			$scope.getInclude = function() {
				if ($scope.viewType === "value") {
					return "./views/new/valueNewAttr.html";
				} else if ($scope.viewType === "activity") {
					return "./views/new/activityNewAttr.html";
				} else {
					return "";
				}
			}
		})
