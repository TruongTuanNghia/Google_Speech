$(function () {
    var chat = $.connection.chatHub;
    $.connection.hub.start().done(function () {
        $('#btnTSClick').click(function () {
            chat.server.translationSpeaks($('#selectLanguage').val(), $('#textEN').text());
        });
    });
})
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}