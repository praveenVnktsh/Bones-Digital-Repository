var dataFromNet;
var currentShowIndex = 0;
fetch("data/data.json")
  .then((response) => response.json())
  .then((json) => {
    dataFromNet = json;
    
    var currentModel = json[currentShowIndex];
    document.getElementById("model").src = currentModel["url"];
    document.getElementById("model-text").textContent = currentModel["name"] + " of a " + currentModel["species"] ;

    console.log(dataFromNet);
  });
