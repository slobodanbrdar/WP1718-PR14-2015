

function doVoznjaMusterija() {
    $("input[name='xkoordinata']").val($("input[name='lokacija_xkoordinata']").val());
    $("input[name='ykoordinata']").val($("input[name='lokacija_ykoordinata']").val());
    $("input[name='voznjaId']").val(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $("input[name='musterijaId']").val(localStorage.getItem('ulogovan'));

    $.ajax({
        type: "POST",
        data: $("form#voznjaMusterija").serialize(),
        url: "api/lokacije/",
        dataType: "json",
        success: function (data) {
            $.ajax({
                type: "POST",
                data: $("form#voznjaMusterija").serialize(),
                url: "api/voznje/",
                dataType: "json",
                success: function () {
                    loadHomepage();
                },
                error: function (jqXHR) {
                    alert(jqXHR.statusText);
                    loadHomepage();
                }
            })
        },
        error: function (jqXHR) {
            if (jqXHR.status != 409) {
                alert(jqXHR.statusText)
                loadHomepage();
            }
            else {
                let x = $("input[name='xkoordinata']").val();
                let y = $("input[name='ykoordinata']").val();
                $.ajax({
                    type: "PUT",
                    data: $("form#voznjaMusterija").serialize(),
                    url: "api/lokacije/PutLokacija",
                    dataType: "json",
                    success: function () {
                        $.ajax({
                            type: "POST",
                            data: $("form#voznjaMusterija").serialize(),
                            url: "api/voznje/",
                            dataType: "json",
                            success: function () {
                                loadHomepage();
                            },
                            error: function (jqXHR) {
                                alert(jqXHR.statusText);
                                loadHomepage();
                            }
                        })
                    },
                    error: function (jqXHR) {
                        alert(jqXHR.statusText);
                        loadHomepage();
                    }
                })
            }
        }
        
    })
}

function doPotvrda() {
    $("input[name='xkoordinata']").val($("input[name='odredistex']").val());
    $("input[name='ykoordinata']").val($("input[name='odredistey']").val());
    $.ajax({
        type: "POST",
        data: $("form#potvrdaVoznje").serialize(),
        dataType: "json",
        url: "api/Lokacije",
        success: function (data) {
            $.ajax({
                type: "PUT",
                dataType: "json",
                data: $("form#potvrdaVoznje").serialize(),
                url: "api/Voznje/PotvrdiVoznju",
                success: function (data) {
                    alert("Uspesno ste obavili voznju");
                    loadHomepage();
                },
                error: function (jqXHR) {
                    if (jqXHR.statusText == 406) {
                        alert(jqXHR.responseJSON);
                        loadHomepage();
                    }
                    else {
                        alert(jqXHR.statusText);
                        loadHomepage();
                    }

                }
            });
        },
        error: function (jqXHR) {
            if (jqXHR.status != 409) {
                alert(jqXHR.statusText)
                loadHomepage();
            }
            else {
                $.ajax({
                    type: "PUT",
                    data: $("form#potvrdaVoznje").serialize(),
                    url: "api/lokacije/PutLokacija",
                    dataType: "json",
                    success: function () {
                        $.ajax({
                            type: "PUT",
                            dataType: "json",
                            data: $("form#potvrdaVoznje").serialize(),
                            url: "api/Voznje/PotvrdiVoznju",
                            success: function (data) {
                                alert("Uspesno ste obavili voznju");
                                loadHomepage();
                            },
                            error: function (jqXHR) {  
                                alert(jqXHR.statusText);
                                loadHomepage();
                            }
                        });
                    },
                    error: function (jqXHR) {
                        alert(jqXHR.statusText);
                        loadHomepage();
                    }
                });
            }
        }
    });
}

function doVoznjaIzmenaVoznje() {
    $("input[name='xkoordinata']").val($("input[name='lokacija_xkoordinata']").val());
    $("input[name='ykoordinata']").val($("input[name='lokacija_ykoordinata']").val());
    $.ajax({
        type: "POST",
        data: $("form#izmenaVoznje").serialize(),
        url: "api/lokacije/",
        dataType: "json",
        success: function (data) {
            $.ajax({
                type: "PUT",
                data: $("form#izmenaVoznje").serialize(),
                url: "api/voznje",
                dataType: "json",
                success: function () {
                    loadHomepage();
                },
                error: function (jqXHR) {
                    alert(jqXHR.statusText);
                    loadHomepage();
                }
            })
        },
        error: function (jqXHR) {
            if (jqXHR.status != 409) {
                alert(jqXHR.statusText)
                loadHomepage();
            }
            else {
                let x = $("input[name='xkoordinata']").val();
                let y = $("input[name='ykoordinata']").val();
                $.ajax({
                    type: "PUT",
                    data: $("form#izmenaVoznje").serialize(),
                    url: "api/lokacije/PutLokacija",
                    dataType: "json",
                    success: function () {
                        $.ajax({
                            type: "PUT",
                            data: $("form#izmenaVoznje").serialize(),
                            url: "api/voznje/",
                            dataType: "json",
                            success: function () {
                                loadHomepage();
                            },
                            error: function (jqXHR) {
                                alert(jqXHR.statusText);
                                loadHomepage();
                            }
                        })
                    },
                    error: function (jqXHR) {
                        alert(jqXHR.statusText);
                        loadHomepage();
                    }
                })
            }
        }

    })
}

function validateIzmenaVoznje() {
    $("form#izmenaVoznje").validate({
        rules: {
            lokacija_xkoordinata: {
                required: true
            },
            lokacija_ykoordinata: {
                required: true
            }
        },
        messages: {
            lokacija_xkoordinata: {
                required: "Morate uneti ovo polje"
            },
            lokacija_ykoordinata: {
                required: "Morate uneti ovo polje"
            }
        },
        submitHandler: function (form) { doVoznjaIzmenaVoznje() }
    });
}

function validateVoznjaMusterija() {
    $("form#voznjaMusterija").validate({
        rules: {
            lokacija_xkoordinata: {
                required: true
            },
            lokacija_ykoordinata: {
                required: true
            }
        },
        messages: {
            lokacija_xkoordinata: {
                required: "Morate uneti ovo polje"
            },
            lokacija_ykoordinata: {
                required: "Morate uneti ovo polje"
            }
        },
        submitHandler: function (form) { doVoznjaMusterija() }
    });
} 

function isisiOpis(par) {
    if ( par == null) {
        return "Nije postavljen komentar";
    }
    else {
        return par.Opis;
    }
}

function isisiOcenu(par) {
    if ( par == null) {
        return "Nije postavljen komentar";
    }
    else {
        return par.Ocena;
    }
}

function isisiDatum(par) {
    if ( par == null) {
        return "Nije postavljen komentar";
    }
    else {
        return par.KometarID;
    }
}

function ispisiKorisnickoIme(par) {
    if (par == null) {
        return "Nije postavljen komentar";
    }
    else {
        return par.VlasnikKomentara;
    }
}

function getUserId(val) {
    if (val.MusterijaID == null) {
        return "Musterija nije zakazala voznju";
    } else {
        return val.MusterijaID;
    }
}

function getDispId(val) {
    if (val.DispecerID == null) {
        return "Dispecer nije zakazao voznju";
    }
    else {
        return val.DispecerID;
    }
}
function ispisiKreiraneVoznje(data) {
    if (data.length == 0) {
        var content = "<p> Nema kreiranih voznji <p>"
    }
    else {
        var content = '<table border="2"> <tr> <td colspan="11" align="center">Moje voznje</td>';
        content += "<tr><td>Datum zakazivanja</td><td>Musterija</td><td>Lokacija X koordinata</td><td>Lokaxija Y koordinata</td><td>Odrediste X koordinata</td><td>Odrediste Y koordinata</td>\
                <td>Zeljeni tip</td><td>Status voznje </td></tr > ";
        $.each(data, function (i, val) {
            content += "<tr> <td>" + val.VoznjaID + "</td><td>" + getUserId(val) + "</td><td>" + val.Lokacija_XKoordinata + "</td><td>" + val.Lokacija_YKoordinata + "</td> <td>" +
                val.Odrediste_XKoordinata + "</td> <td>" + val.Odrediste_YKoordinata + "</td><td>" + getTip(val.ZeljeniTip) +
                "</td><td>" + getStatus(val.StatusVoznje) + "</td>";
            content += "<td><a href='' id='preuzmivoznju'>Preuzmi voznju</a></td></tr>";
        });
        content += "</table>";
    }


    $("div#regdiv").html(content);
    $("div#regdiv").show();

    $("a#preuzmivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var idVoznje = $(this).parent().siblings().eq(0).text();
        $.ajax({
            type: "PUT",
            dataType: "json",
            data: {
                "SenderID": localStorage.getItem("ulogovan"),
                "VoznjaID": idVoznje
            },
            url: "api/Voznje/PreuzmiVoznju",
            success: function () {
                alert("Uspesno ste preuzeli voznju");
                loadHomepage();
            },
            error: function (jqXHR, status) {
                if (jqXHR.status == 406) {
                    alert(jqXHR.responseJSON);
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        data: { id: localStorage.getItem('ulogovan') },
                        url: "api/Korisnici/GetKreiraneVoznje",
                        success: function (data) {
                            ispisiKreiraneVoznje(data);
                        },
                        error: function (jqXHR) {
                            alert(jqXHR.statusText);
                        }
                    });
                } else {
                    alert(jqXHR.statusText);
                }
            }
        })
    });
}
function ispisiTabeluVoznjiVozac(data) {
    if (data.length == 0) {
        var content = "<p> Nema zakazanih voznji na vase ime <p>"
    }
    else {
        var content = '<table border="2"> <tr> <td colspan="11" align="center">Moje voznje</td>';
        content += "<tr><td>Datum zakazivanja</td><td>Musterija</td><td>Dispecer</td><td>Lokacija X koordinata</td><td>Lokaxija Y koordinata</td><td>Odrediste X koordinata</td><td>Odrediste Y koordinata</td>\
                <td>Zeljeni tip</td><td>Iznos</td><td>Status voznje</td><td>Komentar</td> <td>Ocena</td> <td>Datum objave</td> <td>Korisnicko ime</td></tr > ";
        $.each(data, function (i, val) {
            content += "<tr> <td>" + val.VoznjaID + "</td><td>"+ getUserId(val) +"</td><td>"+getDispId(val)+"</td><td>"+ val.Lokacija_XKoordinata + "</td><td>" + val.Lokacija_YKoordinata + "</td> <td>" +
                val.Odrediste_XKoordinata + "</td> <td>" + val.Odrediste_YKoordinata + "</td><td>" + getTip(val.ZeljeniTip) +
                "</td> <td> " + val.Iznos + "</td> <td>" + getStatus(val.StatusVoznje) + "</td> <td>" + isisiOpis(val.KomentarVoznje) + "</td>" +
                "<td>" + isisiOcenu(val.KomentarVoznje) + "</td>" + "<td>" + isisiDatum(val.KomentarVoznje) + "</td><td>" + ispisiKorisnickoIme(val.KomentarVoznje) + "</td>";
            if (val.StatusVoznje == 4) {
                content += "<td><a href='' id='odbacivoznju'> Odbaci voznju </a></td> <td> <a href='' id='obavivoznju'> Obavi voznju </a></td></tr>"
            }
            else {
                content += "</tr>";
            }
        });

        content += "</table>";
    }
    $("div#regdiv").html(content);
    $("div#regdiv").show();

    $("a#obavivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var idVoznje = $(this).parent().siblings().eq(0).text();
        $("div#regdiv").load("./Content/partials/potvrdaVoznje.html", function () {
            $("input[name='voznjaId']").val(idVoznje);
            $("input[name='senderid']").val(localStorage.getItem('ulogovan'));
            validatePotvrda();
        });
    });

    $("a#odbacivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var idVoznje = $(this).parent().siblings().eq(0).text();
        $.ajax({
            type: "PUT",
            dataType: "json",
            data: {
                "SenderID": localStorage.getItem('ulogovan'),
                "VoznjaID": idVoznje
            },
            url: "api/Voznje/OdbaciVoznju",
            success: function (data) {
                $("div#regdiv").load("./Content/partials/komentarOtkazana.html", function () {
                    $("input[name='kometarID']").val(moment().format('MMMM Do YYYY, h:mm:ss a'));
                    $("input[name='vlasnikKomentara']").val(localStorage.getItem('ulogovan'));
                    $("input[name='komentarisanaVoznja']").val(data.VoznjaID);
                    doOtkazVoznja();
                });
            },
            error: function (jqXHR) {
                if (jqXHR.status == 406) {
                    alert(jqXHR.responseJSON);
                }
                else {
                    alert(jqXHR.statusText);
                }
            }
        });
    });
}

function isipisTabeluVoznjiDispecer(data) {
    if (data.length == 0) {
        var content = "<p> Jos niste zakazivali voznje <p>"
    }
    else {
        var content = '<table border="2"> <tr> <td colspan="11" align="center">Moje voznje</td>';
        content += "<tr><td>Datum zakazivanja</td><td>Vozac</td> <td>Lokacija X koordinata</td><td>Lokaxija Y koordinata</td><td>Odrediste X koordinata</td><td>Odrediste Y koordinata</td>\
                <td>Zeljeni tip</td><td>Iznos</td><td>Status voznje</td><td>Komentar</td> <td>Ocena</td> <td>Datum objave</td> <td>Korisnicko ime</td></tr > ";
        $.each(data, function (i, val) {
            content += "<tr> <td>" + val.VoznjaID + "</td><td>" + getDriverId(val) + "</td><td>" + val.Lokacija_XKoordinata + "</td><td>" + val.Lokacija_YKoordinata + "</td> <td>" +
                val.Odrediste_XKoordinata + "</td> <td>" + val.Odrediste_YKoordinata + "</td><td>" + getTip(val.ZeljeniTip) +
                "</td> <td> " + val.Iznos + "</td> <td>" + getStatus(val.StatusVoznje) + "</td> <td>" + isisiOpis(val.KomentarVoznje) + "</td>" +
                "<td>" + isisiOcenu(val.KomentarVoznje) + "</td>" + "<td>" + isisiDatum(val.KomentarVoznje) + "</td><td>" + ispisiKorisnickoIme(val.KomentarVoznje) + "</td></tr>";
        });

        content += "</table>";
    }
    $("div#regdiv").html(content);
    $("div#regdiv").show();

}

function getDriverId(val) {
    if (val.VozacID == null) {
        return "Nijedan vozac nije preuzeo voznju";
    }
    else {
        return val.VozacID;
    }
}

function ispisiTabeluVoznji(data) {
    if (data.length == 0) {
        var content = "<p> Jos niste zakazivali voznje <p>"
    }
    else {
        var content = '<table border="2"> <tr> <td colspan="11" align="center">Moje voznje</td>';
        content += "<tr><td>Datum zakazivanja</td><td>Vozac</td><td>Lokacija X koordinata</td><td>Lokaxija Y koordinata</td><td>Odrediste X koordinata</td><td>Odrediste Y koordinata</td>\
                <td>Zeljeni tip</td><td>Iznos</td><td>Status voznje</td><td>Komentar</td> <td>Ocena</td> <td>Datum objave</td> <td>Korisnicko ime</td></tr > ";
        $.each(data, function (i, val) {
            content += "<tr> <td>" + val.VoznjaID + "</td> <td>" + getDriverId(val) + "</td> <td>" + val.Lokacija_XKoordinata + "</td><td>" + val.Lokacija_YKoordinata + "</td> <td>" +
                val.Odrediste_XKoordinata + "</td> <td>" + val.Odrediste_YKoordinata + "</td><td>" + getTip(val.ZeljeniTip) +
                "</td> <td> " + val.Iznos + "</td> <td>" + getStatus(val.StatusVoznje) + "</td> <td>" + isisiOpis(val.KomentarVoznje) + "</td>" +
                "<td>" + isisiOcenu(val.KomentarVoznje) + "</td>" + "<td>" + isisiDatum(val.KomentarVoznje) + "</td><td>" + ispisiKorisnickoIme(val.KomentarVoznje) + "</td>";
            if (val.StatusVoznje == 1) {
                content += "<td><a href='' id='otkazivoznju'> Otkazi voznju </a> </td>";
                content += "<td><a href='' id='izmenivoznju'> Izmeni voznju </a> </td>";
            }
            else if (val.StatusVoznje == 8 && val.KomentarVoznje == null) {
                content += "<td><a href='' id='kometarisivoznju'> Kometarisi </a></td>";
            }

            content += "</tr>"

        });

        content += "</table>";
    }


    $("div#regdiv").html(content);
    $("div#regdiv").show();
    $("a#izmenivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var xKoordinata = $(this).parent().siblings().eq(1).text();
        var yKoordinata = $(this).parent().siblings().eq(2).text();
        var idVoznje = $(this).parent().siblings().eq(0).text();
        $.ajax({
            type: "GET",
            data: { id: idVoznje },
            dataType: "json",
            url: "api/Voznje/GetVoznja",
            success: function (data) {
                if (data.StatusVoznje != 1) {
                    alert("Voznja je u medjuvremenu promenila stanje, te se ne moze izmeniti");
                    loadHomepage();
                }
                else {
                    $("div#regdiv").load("./Content/partials/izmeniVoznju.html", function () {
                        $("input[name='musterijaId']").val(localStorage.getItem('ulogovan'));
                        $("input[name='lokacija_xkoordinata']").val(data.Lokacija_XKoordinata);
                        $("input[name='lokacija_ykoordinata']").val(data.Lokacija_YKoordinata);
                        $("input[name='xkoordinata']").val(data.Lokacija_xKoordinata);
                        $("input[name='ykoordinata']").val(data.Lokacija_YKoordinata);
                        $("input[name='ulica']").val(data.Lokacija.Ulica);
                        $("input[name='broj']").val(data.Lokacija.Broj);
                        $("input[name='mesto']").val(data.Lokacija.Mesto);
                        $("input[name='pozivnibroj']").val(data.Lokacija.PozivniBroj);
                        $("input[name='statusvoznje']").val(data.StatusVoznje);
                        $("input[name='voznjaId']").val(data.VoznjaID);
                        $("select[name='zeljenitip']").val(data.Zeljenitip);

                        validateIzmenaVoznje();
                    });
                }

            }
        })


    });
    $("a#kometarisivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var datumZakazivanja = $(this).parent().siblings().eq(0).text();
        $("div#regdiv").load("./Content/partials/komentarOtkazana.html", function () {
            $("input[name='kometarID']").val(moment().format('MMMM Do YYYY, h:mm:ss a'));
            $("input[name='vlasnikKomentara']").val(localStorage.getItem('ulogovan'));
            $("input[name='komentarisanaVoznja']").val(datumZakazivanja);
            doOtkazVoznja();
        });
    });
    $("a#otkazivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        var idVoznje = $(this).parent().siblings().eq(0).text();
        var datumZakazivanja = $(this).parent().siblings().eq(0).text();
        var korisnikID = localStorage.getItem('ulogovan');
        var status = 2;
        $.ajax({
            type: "GET",
            data: { id: idVoznje },
            dataType: "json",
            url: "api/Voznje/GetVoznja",
            success: function (data) {
                if (data.StatusVoznje != 1) {
                    alert("Status voznje se u medjuvremenu promenio, te se ova voznja ne moze otkazati");
                    loadHomepage();
                }
                else {
                    $.ajax({
                        type: "PUT",
                        dataType: "json",
                        data: {
                            "SenderID": localStorage.getItem("ulogovan"),
                            "VoznjaID": datumZakazivanja
                        },
                        url: "api/Voznje/OtkaziVoznju",
                        success: function () {

                            $("div#regdiv").load("./Content/partials/komentarOtkazana.html", function () {
                                $("input[name='kometarID']").val(moment().format('MMMM Do YYYY, h:mm:ss a'));
                                $("input[name='vlasnikKomentara']").val(localStorage.getItem('ulogovan'));
                                $("input[name='komentarisanaVoznja']").val(datumZakazivanja);
                                doOtkazVoznja();
                            });
                        },
                        error: function (jqXHR) {
                            alert(jqXHR.statusText);
                            $.ajax({
                                type: "GET",
                                url: "api/korisnici/KorisnickeVoznje",
                                data: { id: localStorage.getItem('ulogovan') },
                                dataType: "json",
                                success: function (data) {
                                    ispisiTabeluVoznji(data);

                                },
                                error: function (jqXHR) {
                                    alert(jqXHR.statusText);
                                    if (jqXHR.status != 406) {
                                        loadHomepage();
                                    }
                                }
                            });
                        }
                    })
                }
            }
        })
       
        
    }) 
}


function getTip(num) {
    if (num == 0) {
        return "Proizvoljno";
    }
    else if (num == 1) {
        return "Putniciki";
    }
    else {
        return "Kombi";
    }
}

function getStatus(num) {
    if (num == 1) {
        return "Kreirana - Na cekanju";
    }
    else if (num == 2) {
        return "Otkazana";
    }
    else if (num == 3) {
        return "Formirana";
    }
    else if (num == 4) {
        return "U toku";
    }
    else if (num == 5) {
        return "Obradjena";
    }
    else if (num == 6) {
        return "Prihvacena";
    }
    else if (num == 7) {
        return "Neuspesna";
    }
    else if (num == 8) {
        return "Uspesna";
    }
}

function doOtkazVoznja() {
    
    $("form#komentarOtkaz").submit(function (e) {

        e.preventDefault();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "api/Komentari",
            data: $("form#komentarOtkaz").serialize(),
            success: function (retData) {
                $.ajax({
                    type: "POST",
                    url: "api/voznje/DodeliKomentar",
                    data: {
                        "KomentarID": retData.KometarID,
                        "VoznjaID": retData.KomentarisanaVoznja,
                        "KorisnikID": retData.VlasnikKomentara
                    },
                    success: function () {
                        alert("Uspesno ste postavili komentar");
                        loadHomepage();
                    },
                    error: function () {
                        alert(jqXHR.statusText);
                        loadHomepage();
                    }
                })
               
                
            },
            error: function (jqXHR) {
                alert(jqXHR.statusText);
                loadHomepage();
            }
        });
    })
}

function selectSlobodneVozace(data) {
    var content = "<tr><td>Izaberite slobodnog vozaca </td>";
    content += "<td> <select name='vozacid'>";
    $.each(data, function (i, val) {
        content += "<option value='" + val.KorisnikID + "'> " + val.KorisnikID + "</option>";
    });
    content += "</td> </tr>";
    
    return content;
}

function doVoznjaDispecer() {
    $("input[name='xkoordinata']").val($("input[name='lokacija_xkoordinata']").val());
    $("input[name='ykoordinata']").val($("input[name='lokacija_ykoordinata']").val());
    $("input[name='voznjaId']").val(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $("input[name='dispecerId']").val(localStorage.getItem('ulogovan'));

    $.ajax({
        type: "POST",
        dataType: "json",
        data: $("form#voznjaDispecer").serialize(),
        url: "api/Lokacije/",
        success: function (data) {
            $.ajax({
                type: "POST",
                data: $("form#voznjaDispecer").serialize(),
                url: "api/voznje/",
                dataType: "json",
                success: function () {
                    loadHomepage();
                },
                error: function (jqXHR) {
                    if (jqXHR.status != 406) {
                        alert(jqXHR.statusText);
                        loadHomepage();
                    }
                    else {
                        alert("Vozac ne poseduje zeljeni tip automobila");
                    }
                    
                }
            })
        },
        error: function (jqXHR) {
            let x = $("input[name='xkoordinata']").val();
            let y = $("input[name='ykoordinata']").val();
            $.ajax({
                type: "PUT",
                data: $("form#voznjaDispecer").serialize(),
                url: "api/lokacije/PutLokacija",
                dataType: "json",
                success: function () {
                    $.ajax({
                        type: "POST",
                        data: $("form#voznjaDispecer").serialize(),
                        url: "api/voznje/",
                        dataType: "json",
                        success: function () {
                            loadHomepage();
                        },
                        error: function (jqXHR) {
                            alert(jqXHR.statusText);
                            loadHomepage();
                        }
                    })
                },
                error: function (jqXHR) {
                    alert(jqXHR.statusText);
                    loadHomepage();
                }
            })
        }
    });
}

function validatePotvrda() {
    $("form#potvrdaVoznje").validate({
        rules: {
            odredistex: {
                required: true
            },
            odredistey: {
                required: true
            }, 
        },
        messages: {
            odredistex: {
                required: "Morate uneti ovo polje"
            },
            odredistex: {
                required: "Morate uneti ovo polje"
            }
        },
        submitHandler: function (form) { doPotvrda() }
    })
}

function validateVoznjaDispecer() {
    $("form#voznjaDispecer").validate({
        rules: {
            lokacija_xkoordinata: {
                required: true
            },
            lokacija_ykoordinata: {
                required: true
            }
        },
        messages: {
            lokacija_xkoordinata: {
                required: "Morate uneti ovo polje"
            },
            lokacija_ykoordinata: {
                required: "Morate uneti ovo polje"
            }
        },
        submitHandler: function (form) { doVoznjaDispecer() }
    });
} 