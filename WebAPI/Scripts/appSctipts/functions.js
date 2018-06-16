function loadHomepage() {
    let data = JSON.parse(localStorage.getItem('ulogovan'));
    $('div#regdiv').text("Dobrodosli " + data.KorisnikID);
    $('#reg').hide();
    $("#odjava").text("Odjava");
    $("#odjava").bind('click', function () {
        localStorage.removeItem('ulogovan');
        location.reload();
        return false;
    });
}

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