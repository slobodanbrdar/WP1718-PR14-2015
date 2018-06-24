

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
                    url: "api/lokacije/" + x + y,
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

function ispisiTabeluVoznji(data) {
    var content = '<table border="2"> <tr> <td colspan="11" align="center">Moje voznje</td>';
    content += "<tr><td>Datum zakazivanja</td> <td>Lokacija X koordinata</td><td>Lokaxija Y koordinata</td><td>Odrediste X koordinata</td><td>Odrediste Y koordinata</td>\
                <td>Zeljeni tip</td><td>Iznos</td><td>Status voznje</td><td>Komentar</td> <td>Ocena</td> <td>Datum objave</td></tr > ";
    $.each(data, function (i, val) {
        content += "<tr> <td>" + val.VoznjaID + "</td> <td>" + val.Lokacija_XKoordinata + "</td><td>" + val.Lokacija_YKoordinata + "</td> <td>" +
            val.Odrediste_XKoordinata + "</td> <td>" + val.Odrediste_YKoordinata + "</td><td>" + getTip(val.ZeljeniTip) +
            "</td> <td> " + val.Iznos + "</td> <td>" + getStatus(val.StatusVoznje) + "</td> <td>" + isisiOpis(val.KomentarVoznje) + "</td>" +
            "<td>" + isisiOcenu(val.KomentarVoznje) + "</td>" + "<td>" + isisiDatum(val.KomentarVoznje) + "</td>";
        if (val.StatusVoznje == 1) {
            content += "<td><a href='' id='otkazivoznju'> Otkazi voznju </a> <td></tr>"
        }
        else {
            content += "</tr>"
        }
    });

    content += "</table>";

    $("div#regdiv").html(content);
    $("a#otkazivoznju").bind('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        var datumZakazivanja = $(this).parent().siblings().eq(0).text();
        var korisnikID = localStorage.getItem('ulogovan');
        var status = 2;
       
        $.ajax({
            type: "POST",
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
                    url: "api/korisnici/KorisnickeVoznje/" + localStorage.getItem('ulogovan'),
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
                        $.ajax({
                            type: "GET",
                            url: "api/korisnici/KorisnickeVoznje/" + localStorage.getItem('ulogovan'),
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
                url: "api/lokacije/" + x + y,
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