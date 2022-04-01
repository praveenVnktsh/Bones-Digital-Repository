const modelViewer = document.querySelector("model-viewer");
window.switchSrc = (element, name) => {
  const base = "../../assets/ShopifyModels/" + name;
  modelViewer.src = base + ".glb";
  modelViewer.poster = base + ".png";
  const slides = document.querySelectorAll(".slide");
  slides.forEach((element) => {
    element.classList.remove("selected");
  });
  element.classList.add("selected");
  currentShowIndex= name;
  var currentModel = dataFromNet[currentShowIndex];

  document.getElementById("model").src = currentModel["url"];
  document.getElementById("model-text").textContent = currentModel["name"] + " of a " + currentModel["species"] ;

};

document.querySelector(".slider").addEventListener("beforexrselect", (ev) => {
  // Keep slider interactions from affecting the XR scene.
  ev.preventDefault();
});
