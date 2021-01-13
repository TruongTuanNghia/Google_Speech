$(function () {
    var chat = $.connection.chatHub;
    $.connection.hub.start().done(function () {
        $('#btnTTP').click(function () {
           // $('#sendmessage').prop('disabled', false);
            //chat.server.playAudioTextToSpeech($('#selectLanguage').val(),$('#textTTSValue').val());
            chat.server.textToSpeech($('#selectLanguageTextToSpeech').val(), $('#textTTSValue').val());
        });
    });
});
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
//change language input
$('#selectLanguageTextToSpeech').on('change', function () {
    $('#textTTSValue').val(null);
})