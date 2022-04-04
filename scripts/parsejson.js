var manifest;

fetch("data/model/manifest.json")
  .then((response) => response.json())
  .then((json) => {
    manifest = json;
    var text = "";
    for (let i = 0; i < manifest.length; i++) {
      text +=
        "<li><button onclick= \"switchJSON(this,'" +
        manifest[i]["loc"] +
        '\')" class="flex gap-4 text-left">';
      text +=
        '<span class="flex-1">' +
        manifest[i]["species"] +
        "</span></button></li>";
    }
    document.getElementById("speciesMenu").innerHTML = text;
    switchJSON(this, manifest[0]["loc"]);
  });
