demoApp.controller('demoController', function ($scope, $document, $window, $log, demoService, $rootScope, $translate, $filter) {

    //****************************************************/
    //*   Init variables                                 */
    //****************************************************/
    //Variabler for all forms
    $scope.UserLoggedIn = false;
    $scope.InvalidUser = false;
    $scope.InvalidPremission = false; //MobilKER elérés jogosutság
    $scope.InvalidInventoryPermission = false; //Leltármegtekintői jogosultság

    $scope.ShowFunctionsForm = false;
    $scope.ShowRecordingForm = false;
    $scope.ShowUpdateInventoryForm = false;

    //Variables for login form
    $scope.LoginFormValid = true;
    $scope.ShowLoginSpinner = false;
    $scope.DisableLoginButton = false;
    $scope.Username = "";
    $scope.Password = "";

    //Variables for alert messages
    $rootScope.alertsTimeout = "10000";
    $rootScope.alerts = [];
    $rootScope.modalAlerts = [];

    //Variables for navigaion form
    $scope.NavItems = [];

    //Variables for functions form
    $scope.Functions = ["Leltár rögzítés"];

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

    //Variables for search/update item modal
    $scope.ItemModalModel = {
        barCode: "599134567890",
        itemNumber: "1-154-15-123465",
        itemName: "Unikum szilva 0.5L | 35%",
        itemCount: 5,
        comment: "Teszt megjegyzés \n akár több sorban is",
        username: "Megfel Elek",
        commitDate: "2018.02.15 13:05:42",
        lastModifiedUsername: "Bekő Tóni",
        lastModifiedDate: "2018.02.16 10:43:21"
    };

    //Variables for yes/no modal
    $scope.YesNoModalModel = {
        text: "Biztosan szeretné törölni a rögzített terméket?",
        function: "DeleteItem",
        barCode: "599134567890"
    };

    //****************************************************/
    //*   Set Default properties for start               */
    //****************************************************/
    $scope.Init = function(){
        $scope.HeaderMessage = $filter('translate')('LoginHeaderMessage');
        $scope.RootMenu = {
            title: $filter('translate')('StartNavigationValue'),
            function: "root"
        };
        $scope.NavItems.push($scope.RootMenu);
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

            //TODO: Lecserélni login service hívásra
            if ($scope.Username === "asd" && $scope.Password === "asd") {

                $scope.InvalidUser = false;
                $scope.UserLoggedIn = true;
                $scope.InvalidPremission = false;
                $scope.InvalidInventoryPermission = false;
                $scope.ShowFunctionsForm = true;
                $rootScope.alert("danger", $filter('translate')('ErrorInvalidInventoryPermission'));
            }
            else {
                $scope.UserLoggedIn = false;
                $scope.InvalidUser = true;
                $scope.InvalidPremission = true;
                $scope.ShowLoginSpinner = false;
                $scope.LoginFormValid = false;
                $scope.DisableLoginButton = false;

                //Hibaszövegek
                $rootScope.alerts = [];
                if ($scope.InvalidUser) {
                    $rootScope.alert("danger", $filter('translate')('ErrorInvalUduser'));
                }
                else if ($scope.InvalidPremission) {
                    $rootScope.alert("danger", $filter('translate')('ErrorInvalidPremission'));
                }
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

        //Breadcrumb menü léptető számláló
        var index = 0;
        for (var i = 0; i < $scope.NavItems.length; i++) {
            if ($scope.NavItems[i] === item) {
                index = i;
                $scope.NavItems.splice(index+1, $scope.NavItems.length - index);
                break;
            }
        }

        //Breadcrumb menü léptető controller
        switch (item.function) {
            case "root": {
                $scope.ShowFunctionsForm = true;
                $scope.ShowRecordingForm = false;
                $scope.ShowUpdateInventoryForm = false;
                break;
            }
            case "0": {
                $scope.ShowFunctionsForm = false;
                $scope.ShowRecordingForm = true;
                $scope.ShowUpdateInventoryForm = false;
                break;
            }
        }

    };

    //****************************************************/
    //*   Add new navigation items                       */
    //****************************************************/
    $scope.AddNewMenuItem = function (newItem, menuFunc) {

        var newNavItem = {
            title: newItem,
            function: "" + menuFunc+ ""
        };
        
        $scope.NavItems.push(newNavItem);

        if (menuFunc === 0) {
            $scope.ShowFunctionsForm = false;
            $scope.ShowRecordingForm = true;
            $scope.ShowUpdateInventoryForm = false;
        }
    };

    $scope.OpenInventory = function (inventoryId, warehouse) {
        var newNavItem = {
            title: inventoryId + "(" + warehouse + ")",
            function: ""
        };

        $scope.NavItems.push(newNavItem);

        $scope.ShowFunctionsForm = false;
        $scope.ShowRecordingForm = false;
        $scope.ShowUpdateInventoryForm = true;
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
