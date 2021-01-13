//$(function () {
//    var transcript = '';
//    var transcriptTextEn = '';
//    var chat = $.connection.chatHub;
//    // Create a function that the hub can call back to display messages.   
//    chat.client.loadTypingTranslation = function () {
//        $('#textVi').html('').css('color', '#fe0000').text('Đang xử lý...');
//    }
//    chat.client.addTextToPageTranslation = function (message) {      
//        $('#textVi').html(null).css('color', '#000000').append(
//            $('<p>').html(transcript)
//        ).append(
//            $('<p>').html(htmlEncode(message))
//        );
//        let curent_transcript = $('#textVi').html();
//        transcript = curent_transcript;       
//    }
//    chat.client.addTranslation = function (message) {
//        $('#textEN').html(null).append(
//            $('<p>').html(transcriptTextEn)
//        ).append(
//            $('<p>').html(htmlEncode(message))
//        );
//        let curent_transcript = $('#textEN').html();
//        transcriptTextEn = curent_transcript;
//    }
//    $.connection.hub.start().done(function () {
//        $('#btnSpeakStranslation').click(function () {
//            //$('#btnSpeakStranslation').prop('disabled', true);
//            chat.server.speakTranslation($('#selectLanguageTranslation').val());
//        });
//    });
//})
//// This optional function html-encodes messages for display in the page.
//function htmlEncode(value) {
//    var encodedValue = $('<div />').text(value).html();
//    return encodedValue;
//}
//$('#selectLanguageTranslation').on('change', function () {
//    if (this.value == 'en') {
//        $('#bVi').text('English');
//        $('#bEn').text('Tiếng Việt');
//        $('#textVi').text(null);
//        $('#textEN').text(null);
//        debugger
//        transcript = '';
//        transcriptTextEn = '';
//        $.connection.hub.start().done(function () {
//            chat.server.speakTranslation($('#selectLanguageTranslation').val());
//        });
//    }
//    else {
//        $('#bVi').text('Tiếng Việt');
//        $('#bEn').text('English');
//        $('#textVi').text(null);
//        $('#textEN').text(null);
//        transcript = '';
//        transcriptTextEn = '';
//        $.connection.hub.start().done(function () {
//            chat.server.speakTranslation($('#selectLanguageTranslation').val());
//        });
//    }
//});