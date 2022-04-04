var dataFromNet;
var currentShowIndex = 0;
var currentSpecies = "Rhesus Monkey";
fetch("data/data.json")
  .then((response) => response.json())
  .then((json) => {
    dataFromNet = json;
    var currentSpeciesModel = json[currentSpecies];
    var currentModel = currentSpeciesModel[currentShowIndex];
    document.getElementById("model").src = currentModel["url"];
    document.getElementById("model-text").textContent =
      currentModel["name"] + " of a " + currentSpecies;
    var text = "";

    for (let i = 0; i < currentSpeciesModel.length; i++) {
      var temptext = '<button class="slide ';
      if (i == currentShowIndex) {
        temptext += "selected ";
      }
      temptext +=
        'items-end justify-center" onclick="switchSrc(this,' +
        i +
        ')"' +
        'style="background-image: url(' +
        json[currentSpecies][i]["posterurl"] +
        ');background-size: cover;";><div class="transbox"> <p>' +
        json[currentSpecies][i]["name"] +
        "</p> </div></button>";
      text += temptext;
    }
    document.getElementById("boneSelector").innerHTML = text;
    console.log(dataFromNet);
  });
