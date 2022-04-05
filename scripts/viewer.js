const modelViewer = document.querySelector("model-viewer");
var jsondata;
var currentShowIndex = 0;
var currentSpecies;
window.switchSrc = (element, name) => {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((element) => {
    element.classList.remove("selected");
  });
  element.classList.add("selected");
  currentShowIndex = name;

  var currentModel = jsondata["models"][currentShowIndex];
  document.getElementById("model").src = currentModel["url"];
  document.getElementById("model-text").textContent =
    currentModel["name"] + " of a " + currentSpecies;
};

window.switchJSON = (element, name) => {
  fetch(name)
    .then((response) => response.json())
    .then((json) => {
      jsondata = json;
      currentShowIndex = 0;
      currentSpecies = jsondata["species"];
      var models = jsondata["models"];
      var currentModel = models[currentShowIndex];

      document.getElementById("speciesDataCard").innerText =
        json["description"];

      document.getElementById("model").src = currentModel["url"];
      document.getElementById("model").poster = currentModel["posterurl"];
      
      document.getElementById("model-text").textContent =
        currentModel["name"] + " of a " + currentSpecies;
      document.getElementById("speciesInfoCardTitle").innerText =
        currentSpecies;
      // speciesInfoCardTitle

      var text = "";

      for (let i = 0; i < models.length; i++) {
        var temptext = '<button class="slide ';
        if (i == currentShowIndex) {
          temptext += "selected ";
        }
        temptext +=
          'items-end justify-center" onclick="switchSrc(this,' +
          i +
          ')"' +
          'style="background-image: url(' +
          json["models"][i]["posterurl"] +
          ');background-size: cover;";><div class="transbox"> <p>' +
          json["models"][i]["name"] +
          "</p> </div></button>";
        text += temptext;
      }
      document.getElementById("boneSelector").innerHTML = text;
    });
};

document.querySelector(".slider").addEventListener("beforexrselect", (ev) => {
  // Keep slider interactions from affecting the XR scene.
  ev.preventDefault();
});
