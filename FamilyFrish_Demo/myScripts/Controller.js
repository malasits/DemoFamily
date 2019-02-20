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
    $scope.NavItems = [];

    //Variables for functions form
    $scope.Functions = ["Leltár rögzítés", "Komissió ellenőrzés"];

    //Variables for inventory recording form
    $scope.inventoryIdLabel = $filter('translate')('InventoryId');
    $scope.warehouseLabel = $filter('translate')('Warehouse');
    $scope.inventoryRecordBeginLabel = $filter('translate')('InventoryRecordBegin');
    $scope.inventoryRecordEndLabel = $filter('translate')('InventoryRecordEnd');
    $scope.numberOfFixeditemsIdLabel = $filter('translate')('NumberOfFixeditems');
    $scope.inventoryCommentLabel = $filter('translate')('InventoryComment');

    $scope.InventoryModel = {
        inventoryId : "Leltar_TESZT",
        warehouse : "R1 (Teszt)",
        inventoryRecordBegin : "2018.12.27",
        inventoryRecordEnd : "2018.12.28",
        numberOfFixedItems: 56,
        inventoryState: "Nyitott",
        comment: "A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak."+
        "A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban;"+
        "mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa - könyvet"+ 
        "vagy szöveget nyomott papírra, ezt használta.Nem csak 5 "
    };
    $scope.InventoryModelList = [];
    //TODO: kikötni az appból
    $scope.InventoryModel2 = {
        inventoryId: "Leltar_TESZT",
        warehouse: "R1 (Teszt)",
        inventoryRecordBegin: "2018.12.27",
        inventoryRecordEnd: "2018.12.28",
        numberOfFixedItems: 15,
        inventoryState: "Zárt",
        comment: "asdasA Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak." +
            "A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban;" +
            "mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa - könyvet" +
            "vagy szöveget nyomott papírra, ezt használta.Nem csak 5 "
    };
    $scope.InventoryModelList.push($scope.InventoryModel);
    $scope.InventoryModelList.push($scope.InventoryModel2);

    //Variables for inventory update form
    $scope.ItemModel = {
        barCode: "599134567890",
        itemNumber: "1-154-15-123465",
        itemName: "Unikum szilva 0.5L | 35%",
        itemCount: 5
    };
    $scope.ItemModelList = [];
    $scope.ItemModelList.push($scope.ItemModel);
    $scope.ItemModelList.push($scope.ItemModel);
    $scope.ItemModelList.push($scope.ItemModel);
    $scope.ItemModelList.push($scope.ItemModel);

    //****************************************************/
    //*   Set Default properties for start               */
    //****************************************************/
    $scope.Init = function(){
        $scope.HeaderMessage = $filter('translate')('LoginHeaderMessage');
        $scope.NavItems.push($filter('translate')('StartNavigationValue'));
    };
    $scope.Init();



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
    $scope.ClickOnMenuItem = function (item) {
        var index = 0;
        for (var i = 0; i < $scope.NavItems.length; i++) {
            if ($scope.NavItems[i] === item) {
                //angular.element(document.querySelector('#nav-' + item)).addClass("active");
                index = i;
                $scope.NavItems.splice(index+1, $scope.NavItems.length - index);
                break;
            }
        }
    };

    //****************************************************/
    //*   Add new navigation items                       */
    //****************************************************/
    $scope.AddNewMenuItem = function (newItem) {
        $scope.NavItems.push(newItem);
    };

    $scope.asd = function () {
        angular.element(document.querySelector('#itemResultContainer')).css("opacity", "0");
        angular.element(document.querySelector('#itemResultContainer')).css("margin-top", "50px");
    };

    $scope.asd2 = function () {
        angular.element(document.querySelector('#itemResultContainer')).css("opacity", "1");
        angular.element(document.querySelector('#itemResultContainer')).css("margin-top", "25px");
    };
    
});
