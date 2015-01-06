var transactionApp = angular.module('transactionApp', []);

transactionApp.controller("TransactionController", function($scope, $http) {
    $scope.transactions = [];
    $scope.dialogInputs = {};
    $scope.createDialogVisible = false;

    $scope.findAll = function() {
        $http.get('api/transactions', {}).success(function(data) {
            $scope.transactions = data;
        });
    };

    $scope.showCreateDialog = function() {
        $scope.createDialogVisible = true;
    };

    $scope.createTransaction = function() {
        $http.post('api/transactions/', $scope.dialogInputs).success(function(data) {
            $scope.createDialogVisible = false;
            $scope.findAll();
        });
    };

    $scope.closeDialog = function() {
        $scope.dialogInputs = {};
        $scope.createDialogVisible = false;
    };

    $scope.findAll();
});

transactionApp.directive("modalShow", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            // Hide or show the modal
            scope.showModal = function (visible, elem) {
                if (!elem)
                    elem = element;

                if (visible)
                    $(elem).modal("show");
                else
                    $(elem).modal("hide");
            }

            // Watch for changes to the modal-visible attribute
            scope.$watch(attrs.modalShow, function (newValue, oldValue) {
                scope.showModal(newValue, attrs.$$element);
            });

            // Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
            $(element).bind("hide.bs.modal", function () {
                $parse(attrs.modalShow).assign(scope, false);
                if (!scope.$$phase && !scope.$root.$$phase)
                    scope.$apply();
            });
        }
    };
});
