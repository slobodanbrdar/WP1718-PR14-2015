

//======================Load pages=========================
function loadHomepage() {
    $.ajax({
        type: "GET",
        url: "api/Korisnici",
        data: { id: localStorage.getItem('ulogovan') },
        dataType: "json",
        success: function (data) {
            $('div#welcomediv').text("Dobrodosli " + data.KorisnikID);
            $('div#welcomediv').show();
            $("div#regdiv").hide();

            if (data.Uloga == 1 || data.Uloga == 2) {
                $("#dodajvoznju").show();
                $("#dodajvoznju").bind('click', function (e) {
                    e.preventDefault();
                    $("div#welcomediv").hide();
                    if (data.Uloga == 1) {
                        $("div#regdiv").load("./Content/partials/dodajVoznjuMusterija.html");
                        $("div#regdiv").show();
                    }
                    else {
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: "api/Korisnici/GetFreeDrivers",
                            data: { id: localStorage.getItem('ulogovan') },
                            success: function (data) {
                                if (data.length == 0) {
                                    alert("Nema slobodnih vozaca");

                                } else {
                                    $("div#regdiv").show();
                                    $("div#regdiv").load("./Content/partials/dodajVoznjuDispecer.html", function () {
                                        var content = selectSlobodneVozace(data);
                                        $("table#voznjaDispecerTabela").append(content);
                                    });
                                }
                                return false;
                            },
                            error: function (jqXHR) {
                                alert(jqXHR.statusText);
                                loadHomepage();
                            }
                        });
                    }
                   
                });

                if (data.Uloga == 1) {
                    var jsonData = { id: localStorage.getItem('ulogovan') };
                    var dataForSend = JSON.stringify(jsonData);
                    $.ajax({
                        type: "GET",
                        url: "api/korisnici/KorisnickeVoznje",
                        data: jsonData,
                        dataType: "json",
                        success: function (data) {
                            ispisiTabeluVoznji(data);


                        },
                        error: function (jqXHR) {
                            alert(jqXHR.statusText);
                        }
                    });
                }
                else if (data.Uloga == 2) {

                }
            }

            $("#promena").show();
            $("#promena").bind('click', function () {
                $("div#welcomediv").hide();
                $.ajax({
                    type: "GET",
                    url: "api/Korisnici/GetPage",
                    data: { id: data.KorisnikID},
                    dataType: "json",
                    success: function (data) {
                        $("div#regdiv").show();
                        $("div#regdiv").load(data);
                    },
                    error: function (jqHXR) {
                        alert(jqHXR.status);
                        if (jqHXR.status == 401) {
                            localStorage.removeItem('ulogovan');
                            location.reload();
                        }
                    }
                });

                return false;
            });
            $("#odjava").text("Odjava");
            $("#reg").hide();
            $("#odjava").bind('click', function () {
                
                $.ajax({
                    type: "POST",
                    data: '=' + localStorage.getItem('ulogovan'),
                    url: "api/Korisnici/Logout",
                    success: function () {
                        localStorage.removeItem('ulogovan');
                        location.reload();
                        return false;
                    },
                    error: function () {
                        localStorage.removeItem('ulogovan');
                        location.reload();
                        return false;
                    }
                });                    
                
            });
            $("#dodajvozaca").bind('click', function () {
                $("div#welcomediv").hide();
                $("div#regdiv").show();
                $("#regdiv").load("./Content/partials/addDriver.html");
                return false;
            });
            if (data.Uloga == 2) {
                $("#dodajvozaca").show();
            }
            else {
                $("#dodajvozaca").hide();
            }
        },
        error: function (jqXHR) {
            if (jqXHR.status == 401) {
                localStorage.removeItem('ulogovan');
                location.reload();
            }
            
        }
    });
    
}



function loadLogin() {
    $("div#regdiv").show();
    $("div#regdiv").load("./Content/partials/login.html");
    $("div#welcomediv").hide();
    $("#reg").bind('click', function () {
        if ($("#reg").text() == "Registracija") {
            $("div#regdiv").show();
            $("#regdiv").load("./Content/partials/register.html");
            $("#reg").html("Prijava");
            $("#errdiv").hide();
        } else {
            $("div#regdiv").show();
            $("#regdiv").load("./Content/partials/Login.html");
            $("#reg").html("Registracija");
            $("#errdiv").hide();
        }

        return false;
    });
}

//====================================================================

//=========================Submit handlers============================

function doLogSubmit() {
    $.post('/api/korisnici/Prijava', $('form#logform').serialize(), "json")
        .done(function (data, status, xhr) {
            $("#reg").hide();
            $("div#regdiv").hide();
            localStorage.setItem("ulogovan", data.KorisnikID);
            $("div#errdiv").hide();
            loadHomepage();
        })
        .fail(function (jqXHR) {
            $("div#errdiv").text(jqXHR.responseJSON["Message"]).show();
        });
}

function doRegistrationSubmit() {
    $.post('/api/korisnici/', $('form#regform').serialize())
        .done(function (status, data, xhr) {
            alert(data);
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR.responseJSON["Message"]);
        });
}

function doDriverRegistrationSubmit() {
    $("input[name='IDSender']").val(localStorage.getItem('ulogovan'));
    $("input[name='tipautomobila']").val($("select[name='zeljenitip']").val());
    $("input[name='automobilID']").val($("input[name='brojtaxivozila']").val());
    $.ajax({
        type: "POST",
        data: $('form#regform').serialize(),
        dataType: "json",
        url: "api/automobili/",
        success: function () {
            $.post('api/Korisnici/DodajVozaca', $('form#regform').serialize())
                .done(function () {
                    loadHomepage();
                })
                .fail(function (jqXHR) {
                    alert(jqXHR.responseJSON["Message"]);
                });
        },
        error: function (jqXHR) {
            alert(jqXHR.statusText);
            loadHomepage();
        }
    })
   
}



function doChangeSubmit() {
    $.ajax({
        type: "GET",
        url: "api/Korisnici",
        data: { id: localStorage.getItem('ulogovan')},
        dataType: "json",
        success: function (data) {
            if ($("input[name='uloga']").val() == 3) {
                if ($("input[name='lokacijavozaca_xkoordinata']").val() != data.LokacijaVozaca_XKoordinata || $("input[name='lokacijavozaca_ykoordinata']").val() != data.LokacijaVozaca_YKoordinata) {
                    $("input[name='xkoordinata']").val($("input[name='lokacijavozaca_xkoordinata']").val());
                    $("input[name='ykoordinata']").val($("input[name='lokacijavozaca_ykoordinata']").val());
                    $.post('/api/lokacije/', $('form#changeForm').serialize(), 'json')
                        .done(function () {
                            $.ajax({
                                data: $("#changeForm").serialize(),
                                type: "PUT",
                                url: "api/Korisnici/" + localStorage.getItem('ulogovan'),
                                dataType: "json",
                                success: function () {
                                    loadHomepage();
                                },
                                error: function (jqXHR) {
                                    if (jqXHR.status == 401) {
                                        localStorage.removeItem('ulogovan');
                                        loadHomepage();
                                    }
                                }
                            });
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status == 409) {
                                let x = $("input[name='xkoordinata']").val();
                                let y = $("input[name='ykoordinata']").val();
                                $.ajax({
                                    data: $("#changeForm").serialize(),
                                    type: "PUT",
                                    url: 'api/Lokacije/' + x + y,
                                    success: function () {
                                        loadHomepage();
                                    },
                                    error: function (jqXHR) {
                                        alert(jqXHR.statusText);
                                        if (jqXHR.status == 401) {
                                            localStorage.removeItem('ulogovan');
                                        }
                                        loadHomepage();
                                    }
                                })
                            }
                        });
                }

            }
            else {
                $.ajax({
                    data: $("#changeForm").serialize(),
                    type: "PUT",
                    url: "api/Korisnici/" + localStorage.getItem('ulogovan'),
                    dataType: "json",
                    success: function () {
                        loadHomepage();
                    },
                    error: function (jqXHR) {
                        alert(jqXHR.status);
                        localStorage.removeItem('ulogovan');
                        loadHomepage();
                    }
                });
            }
        },
        error: function (jqXHR) {
            alert(jqXHR.status);
            localStorage.removeItem('ulogovan');
            loadHomepage();
        }

        
    })
   
    
}

//====================================================================


//==================Validate functions=================================

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
        submitHandler: function (form) { doLogSubmit(); }

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


function validateDriverRegister() {
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
            brojtaxivozila: {
                required: true
            },
            godiste: {
                range: [1994, 2018]
            },
            registarskaoznaka: {
                required: true
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
            brojtaxivozila: {
                required: "Obavezno polje"
            },
            godiste: {
                range: "Godiste moze biti izmedju 1994 i 2018"
            },
            registarskaoznaka: {
                required: "Obavezno polje"
            }

        },
        submitHandler: function (form) { doDriverRegistrationSubmit(); }
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
        submitHandler: function (form) { doChangeSubmit(); }
    });
}

//====================================================================


//=========================Other======================================
function changeScript() {
    $.ajax({
        type: "GET",
        url: "api/Korisnici",
        data: { id: localStorage.getItem('ulogovan')},
        dataType: "json",
        success: function (data) {
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
                $("input[name='lokacijavozaca_xkoordinata']").val(data.XKoordinata);
                $("input[name='lokacijavozaca_ykoordinata']").val(data.YKoordinata);
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
        },
        error: function (status, data) {
            localStorage.removeItem('ulogovan');
            location.reload();
        }
    });
   
}

//====================================================================