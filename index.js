
const colorPicker = document.getElementById('color-picker')

//Retrieve the selected color from thecolorapi.com
fetch("https://www.thecolorapi.com/scheme?hex=ff0000&mode=complement&count=6")
    .then(resp => resp.json())
    .then(data => console.log(data.colors[1].hex.value)) /*data.colors is an array of objects hex, rgb, hsl,...etc*/


     //get colorPicker value when click submit button


     function selectOption() {
        const dropdown = document.getElementById('dropdown');
         // get the index of the selected option
         const selectedIndex = dropdown.selectedIndex;
        console.log(dropdown.options[selectedIndex].text)
     }
