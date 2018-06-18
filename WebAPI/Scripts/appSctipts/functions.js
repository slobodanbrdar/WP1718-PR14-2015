 

function loadHomepage() {
    let data = JSON.parse(localStorage.getItem('ulogovan'));
    $('div#regdiv').text("Dobrodosli " + data.KorisnikID);

    $("#promena").show();
    $("#promena").bind('click', function () {
        $("#regdiv").load("./Content/partials/change.html");
        $("#promena").hide();
        
        return false;
    });
    $("#odjava").text("Odjava");
    $("#reg").hide();
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
            $("#errdiv").hide();
        } else {
            $("#regdiv").load("./Content/partials/Login.html");
            $("#reg").html("Registracija");
            $("#errdiv").hide();
        }

        return false;
    });
}

//function bindLog() {
//    $("#logform").submit(function (e) {
//        e.preventDefault();
//        $.post('/api/korisnici/Prijava', $('form#logform').serialize())
//            .done(function (data, status, xhr) {
//                $("#reg").hide();
//                localStorage.setItem("ulogovan", JSON.stringify(data));
//                let recievedObject = JSON.parse(localStorage.getItem("ulogovan"));
//                $("div#errdiv").hide();
//                loadHomepage();
//            })
//            .fail(function (jqXHR) {
//                $("div#errdiv").text(jqXHR.responseJSON["Message"]).show();
//            });
//    });
//}


function doLogSubmit() {
    $.post('/api/korisnici/Prijava', $('form#logform').serialize(), "json")
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
}


//function bindReg() {
//    $("#regform").submit(function (e) {
//        e.preventDefault();
//        $.post('/api/korisnici/', $('form#regform').serialize())
//            .done(function (status, data, xhr) {
//                alert(data);
//            }).fail(function (jqXHR, textStatus) {
//                alert(jqXHR.responseJSON["Message"]);
//            });

//    });
//}

function doRegistrationSubmit() {
    $.post('/api/korisnici/', $('form#regform').serialize())
        .done(function (status, data, xhr) {
            alert(data);
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR.responseJSON["Message"]);
        });
}

function validateLogin() {
    $("#logform").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: {
                required: "Morate uneti ovo polje",
                minlength: "Korisnicko ime mora biti minimum 4 slova dugacak"
            },
            password: {
                required: "Morate uneti ovo polje",
                minlength: "Lozinka mora biti minimum 5 slova dugacak"
            }
        },
        submitHandler: function (form) { doLogSubmit() }

    });
}

function validateRegister() {
    $("#regform").validate({
        rules: {
            korisnikId: {
                required: true,
                minlength: 4
            },
            lozinka: {
                required: true,
                minlength: 5
            },
            lozinka2: {
                required: true,
                equalTo:"#lozinka"
            },
            ime: "required",
            prezime: "required",
            email: {
                email: true
            },
            jmbg: {
                required: true,
                number: true,
                minlength: 13,
                maxlength: 13
            },
            telefon: {
                number: true
            }
        },
        messages: {
            korisnikId: {
                required: "Obavezno polje",
                minlength: "Korisnicko ime mora imati minimum 4 karaktera"
            },
            lozinka: {
                required: "Obavezno polje",
                minlength: "Lozinka mora imati minimum 5 karaktera"
            },
            lozinka2: {
                required: "Obavezno polje",
                equalTo: "Mora se slagati sa lozinkom"
            },
            ime: "Obavezno polje",
            prezime: "Obavezno polje",
            email: {
                email: "Morate uneti validnu email adresu"
            },
            jmbg: {
                required: "Obavezno polje",
                number: "Morate uneti broj",
                minlength: "JMBG mora biti broj od 13 cifara",
                maxlength: "JMBG mora biti broj od 13 cifara"
            },
            telefon: {
                number: "Morate uneti broj"
            }
        },
        submitHandler: function (form) { doRegistrationSubmit() }
    });
}

function doChangeSubmit() 
{
    let data = JSON.parse(localStorage.getItem("ulogovan"));
    $.ajax({
        data: $("#changeForm").serialize(),
        type: "PUT",
        url: "api/Korisnici/" + data.KorisnikID,
        dataType: "json",
        success: function () {
            $.get('api/korisnici/' + data.KorisnikID, function (data, status) {
                localStorage.setItem("ulogovan", JSON.stringify(data));
            });
            loadHomepage();
        },
        error: function (status) {
            alert(status);
        }
    });
}

function validateChange() {
    $("#changeForm").validate({
        rules: {
            korisnikId: {
                required: true,
                minlength: 4
            },
            lozinka: {
                required: true,
                minlength: 5
            },
            lozinka2: {
                required: true,
                equalTo: "#lozinka"
            },
            ime: "required",
            prezime: "required",
            email: {
                email: true
            },
            jmbg: {
                required: true,
                number: true,
                minlength: 13,
                maxlength: 13
            },
            telefon: {
                number: true
            }
        },
        messages: {
            korisnikId: {
                required: "Obavezno polje",
                minlength: "Korisnicko ime mora imati minimum 4 karaktera"
            },
            lozinka: {
                required: "Obavezno polje",
                minlength: "Lozinka mora imati minimum 5 karaktera"
            },
            lozinka2: {
                required: "Obavezno polje",
                equalTo: "Mora se slagati sa lozinkom"
            },
            ime: "Obavezno polje",
            prezime: "Obavezno polje",
            email: {
                email: "Morate uneti validnu email adresu"
            },
            jmbg: {
                required: "Obavezno polje",
                number: "Morate uneti broj",
                minlength: "JMBG mora biti broj od 13 cifara",
                maxlength: "JMBG mora biti broj od 13 cifara"
            },
            telefon: {
                number: "Morate uneti broj"
            }
        },
        submitHandler: function (form) { doChangeSubmit() }
    });
}