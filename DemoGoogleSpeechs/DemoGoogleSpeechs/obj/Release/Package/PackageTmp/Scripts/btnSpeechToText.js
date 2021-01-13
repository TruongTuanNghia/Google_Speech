$(function () {
    var chat = $.connection.chatHub;   
    // Create a function that the hub can call back to display messages.
    chat.client.addTextToPage = function (message) {     
        var text = $('#STTText').val();            
        document.getElementById("STTText").innerHTML = text + " " + htmlEncode(message);
        document.getElementById("textVi").innerHTML = text + " " + htmlEncode(message);
        document.getElementById("textTTSValue").innerHTML = text + " " + htmlEncode(message);      
    }
    chat.client.addTranslation = function (message) {         
        //$('#loading').fadeIn("fast", function () {
        //    $("#loading").fadeOut(4000);
        //});   
        var textEN = $('#textEN').val();
        document.getElementById("textEN").innerText = textEN+" "+ htmlEncode(message);
        //$('#textEN').append('<li><strong>' + htmlEncode(name)
        //    + '</strong> ' + htmlEncode(message) + '</li>');
    }
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {
            //chat.server.speechToText();
            chat.server.speechToTextFinal();
        });
    });
})
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}