$(function () {
    var chat = $.connection.chatHub;
    $.connection.hub.start().done(function () {
        $('#btnTTP').click(function () {
           // $('#sendmessage').prop('disabled', false);
            //chat.server.playAudioTextToSpeech($('#selectLanguage').val(),$('#textTTSValue').val());
            chat.server.textToSpeech($('#selectLanguage').val(), $('#textTTSValue').text());
        });
    });
});
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}