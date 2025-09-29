
const btn = document.getElementById("btn");
const colorCode = document.getElementById("colorCode");

function getRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777216).toString(16);
  return "#" + randomColor.padStart(6, "0");
}

btn.addEventListener("click", () => {
  let newColor = getRandomColor();
  document.body.style.backgroundColor = newColor; 
  colorCode.textContent = "Current Color: " + newColor; 
});
