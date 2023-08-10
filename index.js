const colorPicker = document.getElementById("color-picker");
const submitBtn = document.getElementById("submit-btn");
const dropdown = document.getElementById("dropdown");
const showColorBox = document.getElementById("show-colors");
const pickerLabel = document.querySelector(".picker-label");
const copyToClipBoard = document.getElementById("copyToClipboard");

//Sets the defaults to #00000 when page initially loads
// and retrieves default color from thecolorapi.com
function onLoad() {
  pickerLabel.textContent = colorPicker.value;
  setBackgroundColorDropdownSubmitBtn();
  getColors(colorPicker.value, dropdown.options[dropdown.selectedIndex].value);
}

//Copies the color of the color box to the clipboard
document.addEventListener("click", (e) => {
  const clickedEl = e.target.id;
  const checkForNum = parseInt(clickedEl.slice(-1));
  if (checkForNum >= 0) {
    console.log(checkForNum);
    const colorText = document.getElementById(`color-text${checkForNum}`);
    navigator.clipboard.writeText(colorText.textContent);
    copyToClipBoard.textContent = `${colorText.textContent} copied to clipboard`;
  }
});

//call getColors function
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const colorPicked = colorPicker.value;
  const dropdownValue = dropdown.options[dropdown.selectedIndex].value;
  getColors(colorPicked, dropdownValue);
});

//set the color of the text next to the color picker
// to the color selected
colorPicker.addEventListener("change", () => {
  pickerLabel.textContent = colorPicker.value;
  pickerLabel.style.color = colorPicker.value;
  copyToClipBoard.textContent = "";
  setBackgroundColorDropdownSubmitBtn();
});

//sets the background of the submit button and
// dropdown to the selected color with an opacity of .6
function setBackgroundColorDropdownSubmitBtn() {
  const hex = colorPicker.value;
  const opacity = ".6";
  const red = parseInt(hex.substring(1, 3), 16);
  const green = parseInt(hex.substring(3, 5), 16);
  const blue = parseInt(hex.substring(5, 7), 16);
  const rgba = ` rgba(${red}, ${green}, ${blue}, ${opacity})`;
  submitBtn.style.backgroundColor = rgba;
  dropdown.style.backgroundColor = rgba;
}

// retrieves selected color and mode from thecolorapi.com
function getColors(colorPicked, dropdownValue) {
  fetchURL = `https://www.thecolorapi.com/scheme?hex=${colorPicked.substring(
    1
  )}&mode=${dropdownValue}&count=6`;
  fetch(fetchURL)
    .then((resp) => resp.json())
    .then((data) => render(data.colors));
}

//prints the color boxes onto the screen
function render(colors) {
  let i = 0;
  showColorBox.innerHTML = "";
  for (const color of colors) {
    let colorValue = color.hex.value;
    showColorBox.innerHTML += `<div id="colorBox${i}"" class="color-box">
      <span id="color-text${i}" class="color-text">${colorValue}</span>
        </div>`;
    document.getElementById(`colorBox${i}`).style.backgroundColor = colorValue;
    document.getElementById(`color-text${i}`).style.color =
      getTextColor(colorValue);
    i++;
  }
}

//sets the default look of the page
onLoad();

/*The following function determine if the color value that
appear in the color bars should show up as white or black text */

function getRGB(c) {
  return parseInt(c, 16) || c;
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f, b) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, "#ffffff");
  const blackContrast = getContrast(bgColor, "#000000");

  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}
