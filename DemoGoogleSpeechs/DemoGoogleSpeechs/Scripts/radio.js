//$(function () {
//    var chat = $.connection.chatHub;
//    $.connection.hub.start().done(function () {
//        $('.radioSelect').click(function () {       
//            chat.server.stopMicro();
//        });       
//    });
//});

$("input[name='radioSelect']").on('change', function (e) {
    e.preventDefault();
    let typefrom = $.trim($(this).val());
    $('.pnl_form').each(function () {
        $(this).toggleClass('hide', ($(this).attr('data-value') != typefrom));
    });
});