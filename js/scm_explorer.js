$(document).ready(function(){
  $("#result").html(settings.username);
  $.post(settings.baseurl+"/api/rest/authentication/login.json",
    {
      "username" : settings.username,
      "password" : settings.password
    },
    function(result) {
      fillRepos();
    });

  $("#doLogin").click(function(){

    var params = {"username":$("#loginUsername").val(),
                  "password":$("#loginPassword").val(),
                  "rememberMe":$("#loginRemember").val()};
    $.post(settings.baseurl+"/api/rest/authentication/login.json",params,function(state) {
      console.log(state);
    })
  });

});

function fillRepos() {
  $.get(settings.baseurl+"/api/rest/repositories.json",function(result) {
    resultSpan=$("#result");
    var list;
    for  (var repo of result) {
      list=list+("<li>" + repo.name + "</li>");
    }
    resultSpan.html(list);
  });
}
