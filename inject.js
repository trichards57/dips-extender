const bodyFrame = document.getElementById("bodyiframe");

bodyFrame.onload = function() {
  console.log(bodyFrame.contentWindow.location.href);
};

