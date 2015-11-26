
var loginModule=function(){




  var inputServer = $("#inputServer");
  var inputUser = $("#inputUser");
  var inputPassword = $("#inputPassword");
  var inputRememberMe = $("#inputRememberMe");
  var loginButton = $("#loginButton");
  var errorMessage=$("#errorMessage");


  var setupForm=function() {
    $("#loginForm").css("margin-top", Math.max(0, ($(window).height() - $("#loginForm").height()) / 3));

  }

   // Reposition when the window is resized
   $(window).on('resize', function() {
      setupForm();
   });




  var isLoginReady =function () {
    return inputServer.val().trim().length && inputUser.val().trim().length && inputPassword.val().trim().length;
  }

  var setLoginButtonStatus = function () {
    if (isLoginReady()) {
      loginButton.removeClass("disabled");
    }else{
      loginButton.addClass("disabled");
    }
  };

  var recoverUser=function () {
    console.log(local);
    local.get([CONFIG.USERNAME, CONFIG.BASE_URL, CONFIG.REMEMBER_ME],function(data) {
      if (data) {
        if (data[CONFIG.USERNAME]) {
          inputUser.val(data[CONFIG.USERNAME]);
        }
        if (data[CONFIG.BASE_URL]) {
          inputServer.val(data[CONFIG.BASE_URL]);
        }
        if (data[CONFIG.REMEMBER_ME]) {
          inputRememberMe.prop("checked",data[CONFIG.REMEMBER_ME]);
        }

      }
    });
  };

  var onLoginConnect = function (data) {
    var config={};
    config[CONFIG.REMEMBER_ME]=inputRememberMe.prop("checked");
    config[CONFIG.USERNAME] = inputUser.val();
    local.set(config);
    $("#loginContainer").show();
    $("#waitSpinner").hide();
    goToMain();
  }

  var onLoginFail = function () {
    $("#loginContainer").show();
    $("#waitSpinner").hide();
    errorMessage.show();
  }

  loginButton.click(function() {

    if (isLoginReady()) {
      errorMessage.hide();
      $("#loginContainer").hide();
      $("#waitSpinner").show();
      var baseUrl=inputServer.val();
      baseUrl=baseUrl+(baseUrl.endsWith("/")?"":"/");
      var config={};
      config[CONFIG.BASE_URL]=baseUrl
      local.set(config);


      var url=baseUrl+"api/rest/authentication/login.json";
      var params = {"username":inputUser.val(),
                    "password":inputPassword.val(),
                    "rememberMe":inputRememberMe.prop("checked")};
      $.post(url,params,onLoginConnect).fail(onLoginFail);
    }
  });



  //Start!
  inputServer.on('input',setLoginButtonStatus);
  inputUser.on('input',setLoginButtonStatus);
  inputPassword.on('input',setLoginButtonStatus);
  setLoginButtonStatus();
  recoverUser();
  setupForm();
};
