$("#reg").bind('click', function (e) {
    e.preventDefault();
    $("div#regdiv").load("../../Content/partials/Login.html");
});

$(document).on('click', '#submit', function (e) {
    e.preventDefault();
    $.post('/api/korisnici/', $('form#regform').serialize())
        .done(function (status, data, xhr) {
            alert(data);
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR.responseJSON["Message"]);
        });
        
});