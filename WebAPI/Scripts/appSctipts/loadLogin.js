function loadLogin() {
    $("div#regdiv").load("./Content/partials/login.html");
    $("#reg").bind('click', function () {
        if ($("#reg").text() == "Registracija") {
            $("#regdiv").load("./Content/partials/register.html");
            $("#reg").html("Prijava");
        } else {
            $("#regdiv").load("./Content/partials/Login.html");
            $("#reg").html("Registracija");
        }

        return false;
    });
}