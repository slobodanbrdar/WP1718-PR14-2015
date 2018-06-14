$(document).on('click', '#logsubmit', function (e) {
    e.preventDefault();
    $.post('/api/korisnici/Prijava', $('form#logform').serialize())
        .done(function (data, status, xhr) {
            $("#reg").hide();
            localStorage.setItem("ulogovan", JSON.stringify(data));
            let recievedObject = JSON.parse(localStorage.getItem("ulogovan"));
            $("div#regdiv").html("<p>Dobrodosli " + recievedObject.KorisnickoIme + "</p>");
        })
        .fail(function (jqXHR) {
            $("form#logform").after("<br/><p>" + jqXHR.responseJSON["Message"] + "</p>");
        });
});