var demoApp = angular.module('demoApp', ['ngAnimate','ngMessages', 'ui.bootstrap', 'pascalprecht.translate']);

demoApp.config(function ($translateProvider) {
    $translateProvider
        .translations('hu', translationhu);

    //var lang = window.navigator.language || window.navigator.userLanguage;

    //if (lang.indexOf("de") > 0) {
       // $translateProvider.preferredLanguage("de");
    //}
    //else {
        $translateProvider.preferredLanguage("hu");
    //}
});