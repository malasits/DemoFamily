demoApp.controller('demoController', function ($scope, $document, $window, $log, demoService, $rootScope, $translate, $filter) {

    //****************************************************/
    //*   Init variables                                 */
    //****************************************************/
    //Variables for login form
    $scope.LoginFormValid = true;
    $scope.ShowLoginSpinner = false;
    $scope.DisableLoginButton = false;
    $scope.InvalidUser = false;
    $scope.InvalidPremission = false;

    //Variables for alert messages
    $rootScope.alertsTimeout = "10000";
    $rootScope.alerts = [];
    $rootScope.modalAlerts = [];

    //Variables for navigaion form
    $scope.NavItems = ["Home", "Library", "Data", "Menü"];


    //****************************************************/
    //*   Alert messages to application                  */
    //****************************************************/
    $rootScope.closeAlert = function (index) {
        $rootScope.alerts.splice(index, 1);
    };
    $rootScope.closeModalAlert = function (index) {
        $rootScope.modalAlerts.splice(index, 1);
    };

    // type: 'danger', 'success', 'warning', stb
    $rootScope.alert = function (type, msg) {
        $rootScope.alerts.push({ msg: msg, type: type });
    };
    $rootScope.modalAlert = function (type, msg) {
        $rootScope.modalAlerts.push({ msg: msg, type: type });
    };

    //
    $scope.HeaderMessage = $filter('translate')('LoginHeaderMessage');
    

    //*******************************************/
    //*   Login to application                  */
    //*******************************************/
    $scope.LoginFormSubmit = function (isValid) {
        //Form validáció ellenőrzése
        if (isValid) {
            $scope.ShowLoginSpinner = true;
            $scope.LoginFormValid = true;
            $scope.DisableLoginButton = true;

            //TODO: Call login service
            $scope.InvalidUser = true;
            $scope.InvalidPremission = true;

            //Sikeres bejelentkezés
            $rootScope.alert("success", $filter('translate')('SuccessLogin'));

            //Hibaszövegek
            if ($scope.InvalidUser) {
                $rootScope.alert("danger", $filter('translate')('ErrorInvalUduser'));
            }
            else if ($scope.InvalidPremission) {
                $rootScope.alert("danger", $filter('translate')('ErrorInvalidPremission'));
            }
        }
        else {
            $scope.LoginFormValid = false;
        }
    };

    //****************************************************/
    //*   Controll navigation items                      */
    //****************************************************/
    //$scope.$watch('NavItems', function (newValue, oldValue) {
    //    if (newValue) {
    //        //angular.forEach($scope.RefreshmentProducts, function (model) {
    //        //});
    //        var id = 'nav-'$scope.NavItems[$scope.NavItems.length];
    //        angular.element(document.querySelector('#div1')).addClass("active");
    //    }
    //});
    $scope.ClickOnMenuItem = function (item) {
        for (var i = 0; i < $scope.NavItems; i++) {
            if ($scope.NavItems[i] === item) {
                angular.element(document.querySelector('nav-' + item)).addClass("active");
            }
        }
    };
});
