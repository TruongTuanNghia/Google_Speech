function TSClick() {
    var textTTS = document.getElementById("textTTS");
    var translation = document.getElementById("Translation");
    var STTText = document.getElementById("STTText");
    $("#selectLanguage").width(222);
    document.getElementById("selectLanguageVi").innerText = "Tiếng Việt sang tiếng Anh";
    document.getElementById("selectLanguageEn").innerText = "Tiếng Anh sang tiếng Việt";
    document.getElementById("TTS").checked = false;
    document.getElementById("STT").checked = false;
    if (textTTS.style.display = "block") {
        textTTS.style.display = "none";
    }
    if (translation.style.display = "none") {
        translation.style.display = "block"
    }
    if (STTText.style.display = "block") {
        STTText.style.display = "none"
    }
}