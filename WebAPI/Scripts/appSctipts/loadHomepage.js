function loadHomepage() {
    let data = JSON.parse(localStorage.getItem('ulogovan'));
    $('div#regdiv').text("Dobrodosli " + data.KorisnickoIme);
    $('#reg').hide();
    $("#odjava").text("Odjava");
    $("#odjava").bind('click', function () {
        localStorage.removeItem('ulogovan');
        location.reload();
        return false;
    });
}