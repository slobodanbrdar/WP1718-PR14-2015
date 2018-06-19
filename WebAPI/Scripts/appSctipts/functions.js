 

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
    $("#dodajvozaca").bind('click', function () {
        $("#regdiv").load("./Content/partials/addDriver.html");
        return false;
    });
    if (data.Uloga == 2) {
        $("#dodajvozaca").show();
    }
    else {
        $("#dodajvozaca").hide();
    }
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

function changeScript() {
    let data = JSON.parse(localStorage.getItem('ulogovan'));
    $('input[name="korisnikId"]').val(data.KorisnikID);
    $('input[name="lozinka"]').val(data.Lozinka);
    $('input[name="ime"]').val(data.Ime);
    $('input[name="prezime"]').val(data.Prezime);
    $('input[name="email"]').val(data.EMail);
    $('input[name="jmbg"]').val(data.JMBG);
    $('input[name="telefon"]').val(data.Telefon);
    $('select[name="pol"]').val(data.Pol);
    $('input[name="uloga"]').val(data.Uloga);
    if (data.Uloga == 3) {
        $("tr.vozacpolje").show();
        $("input[name='lokacijavozaca_xkoordinata']").val(data.LokacijaVozaca_XKoordinata);
        $("input[name='lokacijavozaca_ykoordinata']").val(data.LokacijaVozaca_YKoordinata);
        if (data.LokacijaVozaca != null) {
            $("input[name='ulica']").val(data.LokacijaVozaca.Ulica);
            $("input[name='broj']").val(data.LokacijaVozaca.Broj);
            $("input[name='pozivnibroj']").val(data.LokacijaVozaca.PozivniBroj);
            $("input[name='mesto']").val(data.LokacijaVozaca.Mesto);
        }
        
    }
    else {
        $("tr.vozacpolje").hide();
    }
    validateChange();
}


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
    if (data.Uloga == 3) {
        if ($("input[name='lokacijavozaca_xkoordinata']").val() != data.LokacijaVozaca_XKoordinata || $("input[name='lokacijavozaca_ykoordinata']").val() != data.LokacijaVozaca_YKoordinata) {
            $("input[name='xkoordinata']").val($("input[name='lokacijavozaca_xkoordinata']").val());
            $("input[name='ykoordinata']").val($("input[name='lokacijavozaca_ykoordinata']").val());
            $.post('/api/lokacije/', $('form#changeForm').serialize(), 'json');
        }
        else {
            $(".vozacpolje").hide();
        }
    }
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
            },
            lokacijavozaca_xkoordinata: {
                required: function () {
                    return $("input[name='lokacijavozaca_ykoordinata']").val != null;
                }
            },
            lokacijavozaca_ykoordinata: {
                required: function () {
                    return $("input[name='lokacijavozaca_xkoordinata']").val != null;
                }
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
            }, 
            lokacijavozaca_xkoordinata: {
                required: "Uneli ste y koordinatu, morate uneti i x"
            },
            lokacijavozaca_xkoordinata: {
                required: "Uneli ste x koordinatu, morate uneti i y"
            }
        },
        submitHandler: function (form) { doChangeSubmit() }
    });
}