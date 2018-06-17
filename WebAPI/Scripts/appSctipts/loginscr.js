
//$("#logform").submit(function (e) {
//    e.preventDefault();
//    $.post('/api/korisnici/Prijava', $('form#logform').serialize())
//        .done(function (data, status, xhr) {
//            $("#reg").hide();
//            localStorage.setItem("ulogovan", JSON.stringify(data));
//            let recievedObject = JSON.parse(localStorage.getItem("ulogovan"));
//            $("div#errdiv").hide();
//            loadHomepage();
//        })
//        .fail(function (jqXHR) {
//            $("div#errdiv").text(jqXHR.responseJSON["Message"]).show();
//        });
//});