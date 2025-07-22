
var gAlignment = "center";
var gFortyFiveRotate = "";
var gThreeDTransform = "";
var gBrightness = "light";
var gFontSizeBack = "medium";
var gFontSizeFace = "medium";

onload = function() {
    initialize();
    backgroundColorChanged();
    contentChanged();
};

function initialize() {
    document.getElementById("input_background_color").addEventListener("input", backgroundColorChanged);
    document.getElementById("input_background_color").addEventListener("change", backgroundColorChanged);
    document.getElementById("input_title").addEventListener("input", contentChanged);
    document.getElementById("input_content").addEventListener("input", contentChanged);
    Array.from(document.getElementsByClassName("alignment_radio")).forEach(function(item){
        item.addEventListener("click", alignmentChanged);
    });
    Array.from(document.getElementsByClassName("font_size_back_radio")).forEach(function(item){
        item.addEventListener("click", fontSizeBackChanged);
    });
    Array.from(document.getElementsByClassName("font_size_face_radio")).forEach(function(item){
        item.addEventListener("click", fontSizeFaceChanged);
    });
    document.getElementById("input_fortyfive_rotate").addEventListener("click", fortyFiveRotateChanged);
    document.getElementById("input_threed_transform").addEventListener("click", threeDTransformChanged);
}

function backgroundColorChanged() {
    document.getElementById("face").style.background = document.getElementById("input_background_color").value;
    document.getElementById("back").style.background = document.getElementById("input_background_color").value;

    var rawValue = document.getElementById("input_background_color").value;
    var r = parseInt(rawValue.substring(1, 3), 16);
    var g = parseInt(rawValue.substring(3, 5), 16);
    var b = parseInt(rawValue.substring(5, 7), 16);
    // var brightness = (r + g + b) / 3;
    var brightness = g;
    if (brightness >= 130) {
        gBrightness = "light";
    } else {
        gBrightness = "dark";
    }
    document.getElementById("face").className = gBrightness + " " + gFontSizeFace;
    document.getElementById("back").className = gBrightness + " " + gFontSizeBack;
}

function contentChanged() {
    var title = document.getElementById("input_title").value;
    var titleSplitted = title.split("\t");

    if (titleSplitted.length >= 2) {
        document.getElementById("title").innerText = titleSplitted[0] + " / " + titleSplitted[1];
        document.getElementById("face_title").innerHTML = escapeText(titleSplitted[0]) + "<br>" + escapeText(titleSplitted[1]);
    } else {
        document.getElementById("title").innerText = titleSplitted[0];
        document.getElementById("face_title").innerText = titleSplitted[0];
    }

    var contentByLine = document.getElementById("input_content").value.split("\n");

    var contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";
    var contentInnerHTML = "<table class='jacket_content'>";
    var n = 1;

    for (let content of contentByLine) {
        if (content.length == 0) {
            contentInnerHTML += "<tr><td>&nbsp;</td></tr>";
            continue;
        }
        var contentSplitted = content.split("\t");
        var songTitle = contentSplitted[0];
        var songDuration = contentSplitted[1] != undefined ? contentSplitted[1] : "";
        contentInnerHTML += "<tr><td class='song_number'>" + n + ".</td><td class='song_title'>" + escapeText(songTitle) + "</td><td class='song_duration'>" + songDuration + "</td></tr>";
        n++;
    }
    contentInnerHTML += "</table>";
    contentDiv.innerHTML = contentInnerHTML;
}

function alignmentChanged(event) {
    if (event != undefined && event.target != undefined && event.target.value != undefined) {
        gAlignment = event.target.value;
        document.getElementById("face_title").className = gAlignment + " " + gFortyFiveRotate + " " + gThreeDTransform;
    }
}

function fortyFiveRotateChanged(event) {
    if (event != undefined && event.target != undefined) {
        if (event.target.checked) {
            gFortyFiveRotate = "fortyfive_rotate";
        } else {
            gFortyFiveRotate = "";
        }
        document.getElementById("face_title").className = gAlignment + " " + gFortyFiveRotate + " " + gThreeDTransform;
    }
}

function threeDTransformChanged(event) {
    if (event != undefined && event.target != undefined) {
        if (event.target.checked) {
            gThreeDTransform = "threed_transform";
        } else {
            gThreeDTransform = "";
        }
        document.getElementById("face_title").className = gAlignment + " " + gFortyFiveRotate + " " + gThreeDTransform;
    }
}

function fontSizeBackChanged(event) {
    var fontSize = undefined;
    if (event != undefined && event.target != undefined && event.target.value != undefined) {
        gFontSizeBack = event.target.value;
        document.getElementById("back").className = gBrightness + " " + gFontSizeBack;
    }
}

function fontSizeFaceChanged(event) {
    var fontSize = undefined;
    if (event != undefined && event.target != undefined && event.target.value != undefined) {
        gFontSizeFace = event.target.value;
        document.getElementById("face").className = gBrightness + " " + gFontSizeFace;
    }
}

function escapeText(text) {
    var result = text;
    result = result.replaceAll(/&/g, "&amp;");
    result = result.replaceAll(/</g, "&lt;");
    result = result.replaceAll(/>/g, "&gt;");
    result = result.replaceAll(/"/g, "&quot;");
    return result;
}
