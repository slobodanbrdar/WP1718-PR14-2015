$(document).on('click', '#submit', function (e) {
    e.preventDefault();
    $.post('/api/korisnici/Registracija', $('form#regform').serialize())
        .done(function (status, data, xhr) {
            alert(data);
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR.responseJSON["Message"]);
        });
        
});