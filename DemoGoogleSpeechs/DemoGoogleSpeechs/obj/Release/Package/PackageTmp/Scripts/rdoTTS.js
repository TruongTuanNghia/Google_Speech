function TTSClick() {
    var textTTS = document.getElementById("textTTS");
    var translation = document.getElementById("Translation");
    var STTText = document.getElementById("STTText");
    $("#selectLanguage").width(100);
    document.getElementById("selectLanguageVi").innerText = "Tiếng Việt";
    document.getElementById("selectLanguageEn").innerText = "Tiếng Anh";
    document.getElementById("STT").checked = false;
    document.getElementById("TS").checked = false;
    if (textTTS.style.display = "none") {
        textTTS.style.display = "block";
    }
    if (translation.style.display = "block") {
        translation.style.display = "none"
    }
    if (STTText.style.display = "block") {
        STTText.style.display = "none"
    }
    //if (selectDiv.style.display = "block") {
    //    selectDiv.style.display = "none";
    //}
}