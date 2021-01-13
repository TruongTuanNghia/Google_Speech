$(function () {
    var transcript = '';
    var transcriptTextEn = '';
    var chat = $.connection.chatHub;
    // Create a function that the hub can call back to display messages.   
    chat.client.loadTyping = function () {
        //$('#loading').fadeIn();
        $('#STTText').html('').append('<i class="fa fa-refresh fa-spin"></i>').css('color', '#fe0000').text('Đang xử lý...');
        $('#textTTSValue').html('').css('color', '#fe0000').text('Đang xử lý...');
        $('#textVi').html('').css('color', '#fe0000').text('Đang xử lý...');
    }
    chat.client.addTextToPage = function (message) {
        $('#STTText').html(null).append(
            $('<p>').html(transcript)
        ).append(
            $('<p>').html(htmlEncode(message))
        );
        let curent_transcript = $('#STTText').html();
        $('#textTTSValue').html(null).append(
            $('<p>').html(transcript)
        ).append(
            $('<p>').html(htmlEncode(message))
        );

        $('#textVi').html(null).append(
            $('<p>').html(transcript)
        ).append(
            $('<p>').html(htmlEncode(message))
        );
        transcript = curent_transcript;     
        //document.getElementById("STTText").innerHTML = text + " " + htmlEncode(message);
        //document.getElementById("textVi").innerHTML = text + " " + htmlEncode(message);
        //document.getElementById("textTTSValue").innerHTML = text + " " + htmlEncode(message);
    }
    chat.client.hideTyping = function () {
        //$('#loading').fadeOut(100);
    }
    chat.client.addTranslation = function (message) {      
        $('#textEN').html(null).append(
            $('<p>').html(transcriptTextEn)
        ).append(
            $('<p>').html(htmlEncode(message))
        );
        let curent_transcript = $('#textEN').html();
        transcriptTextEn = curent_transcript;
    }
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {            
            $('#sendmessage').prop('disabled', true);
            chat.server.speechToTextFinalTranslation($('#selectLanguage').val());     
        });
    });
})
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}