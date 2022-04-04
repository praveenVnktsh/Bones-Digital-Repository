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
      var temptext;
      if(i == currentShowIndex){
        temptext = '<button class="slide ' + 'selected ' + 'items-center" onclick="switchSrc(this,' +
        i +
        ')"> ' +
        json[currentSpecies][i]["name"] +
        "</button>";
      }
      else{
        temptext = '<button class="slide items-center' + '" onclick="switchSrc(this,' +
        i +
        ')"> ' +
        json[currentSpecies][i]["name"] +
        "</button>";
      }
      text += temptext;
        
    }
    document.getElementById("boneSelector").innerHTML = text;
    console.log(dataFromNet);
  });
