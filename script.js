

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
    Array.from(document.getElementsByClassName("font_size_radio")).forEach(function(item){
        item.addEventListener("click", fontSizeChanged);
    });
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
    if (brightness >= 102) {
        document.getElementById("face").className = "light";
        document.getElementById("back").className = "light";
    } else {
        document.getElementById("face").className = "dark";
        document.getElementById("back").className = "dark";
    }
}

function contentChanged() {
    document.getElementById("title").innerText = document.getElementById("input_title").value;
    document.getElementById("face_title").innerText = document.getElementById("input_title").value;

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
    var alignment = undefined;
    if (event != undefined && event.target != undefined && event.target.value != undefined) {
        alignment = event.target.value;
        document.getElementById("face_title").className = alignment;
    }
}

function fontSizeChanged(event) {
    var fontSize = undefined;
    if (event != undefined && event.target != undefined && event.target.value != undefined) {
        fontSize = event.target.value;
        document.getElementById("jacket_table").className = fontSize;
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
