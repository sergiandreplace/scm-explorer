if (chrome) {
  var local=chrome.storage.local;
}
var CONFIG = {
  BASE_URL : "baseUrl",
  USERNAME : "username",
  REMEMBER_ME : "rememeberMe"

};

$(document).ready(function(){
  goToHub();
});
var goToLogin = function() {
  $("#loginContainer").show();
  $("#waitSpinner").hide();
  $("#mainLogout").hide();
  loginModule();
  console.log("toLogin");
};
var goToMain = function() {
  $("#loginContainer").hide();
  $("#waitSpinner").hide();
  $("#mainLogout").show();
  console.log("toMain");
};

var goToHub=function() {

  var onStateConnect = function () {
    goToMain();
  }
  var onStateFail = function () {
    goToLogin();
  }
  var checkLogin = function(baseUrl) {
    var url=baseUrl=baseUrl+(baseUrl.endsWith("/")?"":"/")+"api/rest/authentication/state.json";
    $.get(url,onStateConnect).fail(onStateFail);
  }

  $("#mainLogout").click(function() {
    goToLogin();
  })


  var checkInitialStatus= function() {
    local.get(CONFIG.BASE_URL,function(data) {
      if (data[CONFIG.BASE_URL]) {
        checkLogin(data[CONFIG.BASE_URL]);
      }else{
        goToLogin();
      }
    });
  }

  $("#loginContainer").hide();
  $("#waitSpinner").hide();
  $("#mainLogout").hide();
  checkInitialStatus();

};
