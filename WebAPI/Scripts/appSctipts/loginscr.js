$(document).on('click', '#logsubmit', function (e) {
    e.preventDefault();
    $.post('/api/korisnici/Prijava', $('form#logform').serialize())
        .done(function (status, data, xhr) {
            localStorage.setItem("ulogovan", data);
            $("div#regdiv").html("<p>Dobrodosli" + localStorage.getItem("ulogovan") + "</p>");
        })
        .fail(function (jqXHR) {
            $("form#logform").after("<br/><p>" + jqXHR.responseJSON["Message"] + "</p>");
        });
});