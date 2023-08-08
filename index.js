const colorPicker = document.getElementById('color-picker');
const submitBtn = document.getElementById('submit-btn');
const dropdown = document.getElementById('dropdown');
const showColorBox = document.getElementById('show-colors');
const pickerLabel = document.querySelector('.picker-label');
//Retrieve the selected color from thecolorapi.com
pickerLabel.textContent = colorPicker.value;
/*data.colors is an array of objects hex, rgb, hsl,...etc*/

function render(colors) {
  let i = 0;
  showColorBox.innerHTML = "";
 for (const color of colors) {
   let colorValue = color.hex.value;
  showColorBox.innerHTML +=
      `<div id="colorBox${i}"" class="color-box">
        <span id="color-text${i}" class="color-text">${colorValue}</span> 
        </div>`; 
   document.getElementById(`colorBox${i}`).style.backgroundColor = colorValue;   
  document.getElementById(`color-text${i}`).style.color =      
       getTextColor(colorValue);
    i++;  
 } 
 
}

     //get colorPicker value when click submit button

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const colorPicked = colorPicker.value;
  const dropdownValue = dropdown.options[dropdown.selectedIndex].value; 
  fetchURL = `https://www.thecolorapi.com/scheme?hex=${colorPicked.substring(1)}&mode=${dropdownValue}&count=6`;
  fetch(fetchURL)
    .then(resp => resp.json())
    // .then(data => alert(data.colors[1].hex.value));
  .then(data => render(data.colors));
 });
     
colorPicker.addEventListener('change', () => {
  pickerLabel.textContent = colorPicker.value;
})

function getRGB(c) {
  return parseInt(c, 16) || c
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  )
}

function getContrast(f, b) {
  const L1 = getLuminance(f)
  const L2 = getLuminance(b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, '#ffffff')
  const blackContrast = getContrast(bgColor, '#000000')

  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}
