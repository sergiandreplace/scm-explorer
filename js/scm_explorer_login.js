if (chrome) {
  var local=chrome.storage.local;
}
$(document).ready(function(){
  var inputServer = $("#inputServer");
  var inputUser = $("#inputUser");
  var inputPassword = $("#inputPassword");
  var inputRememberMe = $("#inputRememberMe");
  var loginButton = $("#loginButton");

  var reposition=function () {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');

        // Dividing by two centers the modal exactly, but dividing by three
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    };

    // Reposition when a modal is shown
   $('.modal').on('show.bs.modal', function() {
     reposition();
    });
   // Reposition when the window is resized
   $(window).on('resize', function() {
       $('.modal:visible').each(reposition);
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
    local.get("user",function(data) {
      inputUser.val(data.user.name);
    });
    local.get("baseUrl",function(data) {
      inputServer.val(data.baseUrl);
    });
  };

  var onLoginConnect = function (data) {
      local.set({"user":data.user});
      $("#modalWait").hide();

  }

  var onLoginFail = function () {
    //$("#modalWait").hide();

  }

  loginButton.click(function() {
    if (isLoginReady()) {
      $("#modalWait").show();

      var baseUrl=inputServer.val();
      baseUrl=baseUrl+(baseUrl.endsWith("/")?"":"/");
      local.set({"baseUrl":baseUrl});

      var url=baseUrl+"api/rest/authentication/login.json";
      var params = {"username":inputUser.val(),
                    "password":inputPassword.val()};
      $.post(url,params,onLoginConnect).fail(onLoginFail);
    }
  });



  //Start!
  inputServer.on('input',setLoginButtonStatus);
  inputUser.on('input',setLoginButtonStatus);
  inputPassword.on('input',setLoginButtonStatus);
  setLoginButtonStatus();
  recoverUser();

});
