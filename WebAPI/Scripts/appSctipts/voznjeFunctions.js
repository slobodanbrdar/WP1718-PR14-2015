

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

function ispisiTabeluVoznji(data) {
    var content = '<table border="2"> <tr> <td colspan="10" align="center">Moje voznje</td>';
    content += "<tr><td>Datum zakazivanja</td> <td>Lokacija X koordinata</td><td>Lokaxija Y koordinata</td><td>Odrediste X koordinata</td><td>Odrediste Y koordinata</td>\
                <td>Zeljeni tip</td><td>Iznos</td><td>Status voznje</td></tr > ";
    $.each(data, function (i, val) {
        content += "<tr> <td>" + val.VoznjaID + "</td> <td>" + val.Lokacija_XKoordinata + "</td><td>" + val.Lokacija_YKoordinata + "</td> <td>" +
            val.Odrediste_XKoordinata + "</td> <td>" + val.Odrediste_YKoordinata +"</td><td>" + getTip(val.ZeljeniTip) +
            "</td> <td> " + val.Iznos + "</td> <td>" + getStatus(val.StatusVoznje) + "</td> </tr>";
    });

    content += "</table>";

    $("div#regdiv").html(content);
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
        return "Kreirana";
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