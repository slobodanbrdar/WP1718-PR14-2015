//======================Load pages=========================
function loadHomepage() {
    //$("a#prikazisvevoznje").hide();
    $("div#map").hide();
    $("button#submitMap").hide();
    $.ajax({
        type: "GET",
        url: "api/Korisnici",
        data: { id: localStorage.getItem('ulogovan') },
        dataType: "json",
        success: function (data) {
            $('div#welcomediv').text("Dobrodosli " + data.KorisnikID);
            $('div#welcomediv').show();
            $("div#regdiv").hide();


            if (data.Uloga == 2) {
                $("a#blockunblock").show();
                $("a#blockunblock").bind('click', function (e) {
                    e.preventDefault();
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: "api/Korisnici/GetMusterijeIVozace",
                        data: { id: localStorage.getItem('ulogovan') },
                        success: function (data) {
                            ispisiTabeluKorisnika(data);
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status == 403) {
                                localStorage.removeItem('ulogovan');
                                location.reload();
                            }
                            alert(jqXHR.statusText);
                            loadHomepage();
                        }
                    });
                });
            }
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
                        $("div#regdiv").load("./Content/partials/dodajVoznjuDispecer.html");
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
                            if (jqXHR.status == 403) {
                                alert(jqXHR.responseJSON);
                                localStorage.removeItem('ulogovan');
                                location.reload();
                            }
                            else {
                                alert(jqXHR.statusText);
                            }

                        }
                    });
                }
                else if (data.Uloga == 2) {
                    var jsonData = { id: localStorage.getItem('ulogovan') };
                    $.ajax({
                        type: "GET",
                        url: "api/korisnici/DispecerskeVoznje",
                        data: jsonData,
                        dataType: "json",
                        success: function (data) {
                            isipisTabeluVoznjiDispecer(data);
                            $("a#prikazisvevoznje").show();
                            $("a#prikazisvevoznje").bind('click', function (e) {
                                e.preventDefault();
                                $("div#map").hide();
                                $("button#submitMap").hide();
                                $.ajax({
                                    type: "GET",
                                    dataType: "json",
                                    url: "api/Voznje/GetAllVoznje",
                                    data: { id: localStorage.getItem('ulogovan') },
                                    success: function (data) {
                                        isipisTabeluVoznjiDispecer(data);
                                    },
                                    error: function (jqXHR) {
                                        if (jqXHR.status == 403) {
                                            alert(jqXHR.responseJSON);
                                            localStorage.removeItem('ulogovan');
                                            location.reload();
                                        }
                                        alert(jqXHR.statusText);
                                    }
                                });
                            });
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status == 403) {
                                alert(jqXHR.responseJSON);
                                localStorage.removeItem('ulogovan');
                                location.reload();
                            } else {
                                alert(jqXHR.statusText);
                            }
                            
                        }
                    });

                }
                
            }
            
            if (data.Uloga == 3) {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "api/Korisnici/VozaceveVoznje",
                    data: { id: localStorage.getItem('ulogovan') },
                    success: function (data) {
                        ispisiTabeluVoznjiVozac(data);
                        $("a#kreiranevoznje").show();
                        $("a#kreiranevoznje").bind('click', function (e) {
                            e.preventDefault();
                            $("div#map").hide();
                            $("button#submitMap").hide();
                            $.ajax({
                                type: "GET",
                                dataType: "json",
                                data: { id: localStorage.getItem('ulogovan') },
                                url: "api/Korisnici/GetKreiraneVoznje",
                                success: function (data) {
                                    ispisiKreiraneVoznje(data);
                                },
                                error: function (jqXHR) {
                                    if (jqXHR.status == 403) {
                                        alert(jqXHR.responseJSON);
                                        localStorage.removeItem('ulogovan');
                                        location.reload();
                                    } else {
                                        alert(jqXHR.statusText);
                                    }
                                }
                            });
                        });
                    },
                    error: function (jqXHR) {
                        alert(jqXHR.statusText);
                    }
                });
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
                        if (jqXHR.status == 403) {
                            alert(jqXHR.responseJSON);
                            localStorage.removeItem('ulogovan');
                            location.reload();
                        }
                        else if (jqHXR.status == 401) {
                            localStorage.removeItem('ulogovan');
                            location.reload();
                        }
                        else {
                            alert(jqXHR.statusText);
                        }
                        
                    }
                });

                return false;
            });
            $("#odjava").text("Odjava");
            $("#reg").hide();
            $("#odjava").bind('click', function (e) {
                e.preventDefault();
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
                        if (jqXHR.status == 403) {
                            alert(jqXHR.responseJSON);
                            localStorage.removeItem('ulogovan');
                            location.reload();
                        } else {
                            localStorage.removeItem('ulogovan');
                            location.reload();
                            return false;
                        }
                    }
                });                    
                
            });
            $("#dodajvozaca").bind('click', function () {
                $("div#welcomediv").hide();
                $("div#regdiv").show();
                $("div#map").hide();
                $("button#submitMap").hide();
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
            else if (jqXHR == 406) {
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

function getUloga(p) {
    if (p == 1) {
        return "Musterija";
    }
    else if (p == 2) {
        return "Dispecer";
    }
    else if (p == 3) {
        return "Vozac";
    }
}

function ispisiTabeluKorisnika(data) {
    var content;
    if (data.length == 0) {
        content += "Nema registrovanih vozaca ni musterija";
    }
    else {
        content += '<table border="2" id="musterijevozaci"><thead> <tr> <td colspan="3" align="center">Moje voznje</td></tr>';
        content += "<tr><td>Korisnicko ime<td><td>Uloga</td></tr>";

        for (i = 0; i < data[0].length; i++) {
            content += "<tr><td>" + data[0][i].KorisnikID + "</td><td>" + getUloga(data[0][i].Uloga) + "</td><td><a href='' id='odblokiraj'>Odblokiraj</a></td></tr>"
        }
        for (i = 0; i < data[1].length; i++) {
            content += "<tr><td>" + data[1][i].KorisnikID + "</td><td>" + getUloga(data[1][i].Uloga) + "</td><td><a href='' id='blokiraj'>Blokiraj</a></td></tr>"
        }

        content += "</table>"
    }

    $("div#regdiv").html(content);

    $("a#blokiraj").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var korisnikID = $(this).parent().siblings().eq(0).text();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "api/Korisnici/Blokiraj",
            data: {
                "KorisnikID": korisnikID,
                "SenderID": localStorage.getItem('ulogovan')
            },
            success: function () {
                alert("Uspesno ste blokirali korisnika");
                loadHomepage();
            },
            error: function (jqXHR) {
                if (jqXHR.status == 406) {
                    alert(jqXHR.responseJSON);
                    loadHomepage();
                } else {
                    alert(jqXHR.statusText);
                    loadHomepage();
                }
            }
        });
    });

    $("a#odblokiraj").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var korisnikID = $(this).parent().siblings().eq(0).text();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "api/Korisnici/Odblokiraj",
            data: {
                "KorisnikID": korisnikID,
                "SenderID": localStorage.getItem('ulogovan')
            },
            success: function () {
                alert("Uspesno ste odblokirali korisnika");
                loadHomepage();
            },
            error: function (jqXHR) {
                if (jqXHR.status == 406) {
                    alert(jqXHR.responseJSON);
                    loadHomepage();
                } else {
                    alert(jqXHR.statusText);
                    loadHomepage();
                }
            }
        });
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
    $.post('/api/korisnici/PostKorisnik', $('form#regform').serialize())
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

var map;
var markers = [];
function initMap() {

    var uluru = { lat: 45.2671, lng: 19.8335 };

    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 12, center: uluru });

}

function startMap() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    var uluru = { lat: 45.2671, lng: 19.8335 };
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        draggable: true
    });
    markers.push(marker);
    $("div#map").show();
    $("button#submitMap").show();
    $("button#submitMap").on('click', function (e) {
        e.stopImmediatePropagation();
        var latitude = marker.getPosition().lat();
        var longitude = marker.getPosition().lng();

        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + ',' + longitude + "&sensor=true",
            type: "get",
            success: function (data) {
                $("input[name='lokacijavozaca_xkoordinata']").val(latitude);
                $("input[name='lokacijavozaca_ykoordinata']").val(longitude);
                if (data.status == "OK") {
                    if (data.results[0].address_components.length == 7) {
                        var adresa = data.results[0].address_components;
                        $("input[name='broj']").val(adresa[0].long_name);
                        $("input[name='ulica']").val(adresa[1].long_name);
                        $("input[name='mesto']").val(adresa[2].long_name);
                        $("input[name='pozivnibroj']").val(adresa[6].long_name);
                    }
                    else if (data.results[0].address_components.length == 6) {
                        var adresa = data.results[0].address_components;
                        $("input[name='broj']").val(adresa[0].long_name);
                        $("input[name='ulica']").val(adresa[1].long_name);
                        $("input[name='mesto']").val(adresa[2].long_name);
                        $("input[name='pozivnibroj']").val(adresa[5].long_name);
                    }
                    else if (data.results[0].address_components.length == 5) {
                        var adresa = data.results[0].address_components;
                        alert("Nismo uspeli da dobavimo vas broj i postanski broj. Ukoliko zelite ove podatke mozete uneti rucno");
                        $("input[name='ulica']").val(adresa[0].long_name);
                        $("input[name='mesto']").val(adresa[1].long_name);
                    }
                }
                else {
                    alert("Dogodila se greska prilikom pribavaljanja vase lokacije. Molimo vas da ove podatke unesete rucno ili probajte ponovo.");
                }

            },
            error: function (jqXHR) {
                alert('fail ' + jqXHR.statusText);
            }
        });
    });
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
                                url: "api/Korisnici/PutKorisnik",
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
            if (status.status == 403) {
                alert(jqXHR.responseJSON);
                localStorage.removeItem('ulogovan');
                location.reload();
            }
            localStorage.removeItem('ulogovan');
            location.reload();
        }
    });
   
}

//====================================================================