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

function bindLog() {
    $("#logform").submit(function (e) {
        e.preventDefault();
        $.post('/api/korisnici/Prijava', $('form#logform').serialize())
            .done(function (data, status, xhr) {
                $("#reg").hide();
                localStorage.setItem("ulogovan", JSON.stringify(data));
                let recievedObject = JSON.parse(localStorage.getItem("ulogovan"));
                $("div#errdiv").hide();
                loadHomepage();
            })
            .fail(function (jqXHR) {
                $("div#errdiv").text(jqXHR.responseJSON["Message"]).show();
            });
    });
}

function bindReg() {
    $("#regform").submit(function (e) {
        e.preventDefault();
        $.post('/api/korisnici/', $('form#regform').serialize())
            .done(function (status, data, xhr) {
                alert(data);
            }).fail(function (jqXHR, textStatus) {
                alert(jqXHR.responseJSON["Message"]);
            });

    });
}