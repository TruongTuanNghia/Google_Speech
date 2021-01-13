$(function () {
    var is_speech = false;
    var transcript = '';
    var chat = $.connection.chatHub;
    // Create a function that the hub can call back to display messages.   
    chat.client.loadTyping = function () {
        //$('#loading').fadeIn();
        $('#STTText').html('').css('color', '#fe0000').text('Đang xử lý...');      
    }

    chat.client.addTextToPage = function (message) {
        $('#STTText').html(null).css('color', '#000000').append(
            $('<p>').html(transcript)
        ).append(
            $('<p>').html(htmlEncode(message))
        );
        let curent_transcript = $('#STTText').html();
        transcript = curent_transcript;             
    }
    chat.client.hideTyping = function () {
        //$('#loading').fadeOut(100);
    }

    ////////////////
    var transcriptTranslation = '';
    var transcriptTextEn = '';
    //var chat = $.connection.chatHub;   
    chat.client.loadTypingTranslation = function () {
        $('#textVi').html('').css('color', '#fe0000').text('Đang xử lý...');
    }
    chat.client.addTextToPageTranslation = function (message) {
        $('#textVi').html(null).css('color', '#000000').append(
            $('<p>').html(transcriptTranslation)
        ).append(
            $('<p>').html(htmlEncode(message))
        );
        let curent_transcript = $('#textVi').html();
        transcriptTranslation = curent_transcript;
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
            is_speech = (!is_speech);
            $('#sendmessage').text((is_speech ? 'Đang nói...' : 'Bắt đầu nói...'));
            if (!is_speech) {
                chat.server.stopMicro();
            }
            else {
                chat.server.speechToText($('#selectLanguage').val());
            }
        });
        $('#btnSpeakStranslation').click(function () {
            //$('#btnSpeakStranslation').prop('disabled', true);
            chat.server.speakTranslation($('#selectLanguageTranslation').val());
        });
    });


})

// change language input
$('#selectLanguage').on('change', function () {
    $('#STTText').text(null);
    $.connection.hub.start().done(function () {
        chat.server.speechToText($('#selectLanguage').val());
    });
})

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
$('#selectLanguageTranslation').on('change', function () {
    if (this.value == 'en') {
        $('#bVi').text('English');
        $('#bEn').text('Tiếng Việt');
        $('#textVi').text(null);
        $('#textEN').text(null);
        debugger
        transcript = '';
        transcriptTextEn = '';
        $.connection.hub.start().done(function () {
            chat.server.speakTranslation($('#selectLanguageTranslation').val());
        });
    }
    else {
        $('#bVi').text('Tiếng Việt');
        $('#bEn').text('English');
        $('#textVi').text(null);
        $('#textEN').text(null);
        transcript = '';
        transcriptTextEn = '';
        $.connection.hub.start().done(function () {
            chat.server.speakTranslation($('#selectLanguageTranslation').val());
        });
    }
});
