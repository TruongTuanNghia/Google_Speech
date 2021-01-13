function STTClick() {
    var textTTS = document.getElementById("textTTS");
    var translation = document.getElementById("Translation");
    var STTText = document.getElementById("STTText");
    $("#selectLanguage").width(100);
    document.getElementById("selectLanguageVi").innerText = "Tiếng Việt";
    document.getElementById("selectLanguageEn").innerText = "Tiếng Anh";
    document.getElementById("TTS").checked = false;
    document.getElementById("TS").checked = false;
    if (textTTS.style.display = "block") {
        textTTS.style.display = "none";
    }
    if (translation.style.display = "block") {
        translation.style.display = "none"
    }
    if (STTText.style.display = "none") {
        STTText.style.display = "block";
    }

}