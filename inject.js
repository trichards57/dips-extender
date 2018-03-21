document.body.style.backgroundColor = "green";

const bodyFrame = document.getElementById("bodyiframe");

bodyFrame.onload = function() {
  makeGreen(bodyFrame.contentDocument);
};

makeGreen(bodyFrame.contentDocument);
makeGreen(document);

function makeGreen(doc) {
  if (doc) {
    doc.body.style.backgroundColor = "green";
  }
}
