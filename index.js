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
 for (color of colors) {
   let colorValue = color.hex.value;
  showColorBox.innerHTML +=
      `<div id=colorBox${i} class="color-box">
        <span class="color-text">${colorValue}</span> 
        </div>`; 
   document.getElementById(`colorBox${i}`).style.backgroundColor = colorValue;
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
