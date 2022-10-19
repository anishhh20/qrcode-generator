const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
qrImg = wrapper.querySelector(".qr-code img"),
generateBtn = wrapper.querySelector(".form button"); //here, missing the querySelector the select .form button in 'generateBtn'

let preValue;
document.getElementById("showig").style.visibility = "hidden";
document.getElementById("abt").style.visibility = "hidden";

const dbtn = document.querySelector('.dbtn');
const backH = document.querySelector('.backH');
backH.style.visibility = "hidden";

const fullPage = document.querySelector('.fullscreen');
fullPage.style.visibility = "hidden";


// Display Messages Id's
let demo = document.getElementById("demo");
demo.style.visibility = "hidden";
let demo1 = document.getElementById("demo1");
demo1.style.visibility = "hidden";
let demo2 = document.getElementById("demo2");
demo2.style.visibility = "hidden";


// When I press Enter from Form Input, it will Trigger(click) the "Generate QR Code" button
var input = document.getElementById("text1");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});


// QR Code Generate Button Properties
generateBtn.addEventListener("click", () =>{

    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code⌛.....";
    generateBtn.style.cursor="no-drop";
    generateBtn.style.opacity= "0.7";

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`; //updated qrImg with 'qrImg.src'

    qrImg.addEventListener("load", () =>{
        wrapper.classList.add("active");
        generateBtn.innerText = "QR Code Generated🥳";
        generateBtn.style.cursor="no-drop ";
        generateBtn.style.opacity= "0.7";

        document.querySelector("#text1").addEventListener("input", test);

        document.getElementById("theImage").style.visibility = "hidden";
        document.getElementById("btn").style.visibility = "hidden";
        document.getElementById("btn1").style.visibility = "hidden";
        document.getElementById("demo").style.visibility = "hidden";
        backH.style.visibility = "visible";
        
        //On Mouse Over of tht ele
        generateBtn.onmouseover = function() {
          setTimeout(() => {
            demo1.style.visibility = 'visible';
          }, 150);
        }

        //On Mouse Out of tht ele
        generateBtn.onmouseout = function() {
          setTimeout(() => {
            demo1.style.visibility = 'hidden';
          }, 150);
        }
    });
});


// When Form Input doesn't contain any value, it show as it is before QR Code Generated
qrInput.addEventListener("keyup", () =>{
    if(!qrInput.value.trim()) {

      sameprop();
      
    }
});


// Check's tht Form Input has value or not and display msg
function inputtext(){
    var value1 = document.getElementById('text1').value;
    if (value1.length == 0)
    {        
      demo.style.visibility = "visible";      
      setTimeout(() => {
        demo.style.visibility = 'hidden';
      }, 1300); 
    }
}


// Loading Screen
function loader() {
    document.querySelector('.loading').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 3000);
}
window.onload = fadeOut;


// WhoAmI.gif Image Button Property 
function showImage(){
    document.getElementById("showig").style.visibility = "visible";
}
// Funny-Face.gif Image Button Property 
function showImage1(){
    document.getElementById("abt").style.visibility = "visible";
}
// Hide the opened window, when click on "X" span
function hide(){
    document.getElementById("showig").style.visibility = "hidden";
    document.getElementById("abt").style.visibility = "hidden";
    fullPage.style.visibility = "hidden";
}


// Disable Developer Mode (disable right click, 123 keycode, ctrl+shift+i, ctrl+shift+c, ctrl+shift+j, ctrl+u)
document.onkeydown = function(e) {
  if(event.keyCode == 123) {       
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {       
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {       
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {       
    return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {      
    return false;
  }
}


//disable right click
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
});


// View QR Code Generated Image in large screen
function ck() {
  fullPage.style.visibility = "visible";
  fullPage.style.backgroundImage = 'url(' + qrImg.src + ')';
}


// Download generated QR Code Image on click "DOWNLOAD" button
function downloadIg(elmnt) {
  demo2.style.visibility = "visible";
  dbtn.style.cursor="no-drop";
  dbtn.style.opacity= "0.7";

  const link = elmnt
  const url = qrImg.src
  const options = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
 fetch(url, options)
  .then( response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "QR_Code.jpg";
        a.click();
        dbtn.style.cursor="pointer";
        dbtn.style.opacity= "1";
        demo2.style.visibility = "hidden";
      });
    }); 
}


// Back to Home Button Properties
function backHome(){
  sameprop();
}


// Same Properties for two functions
function sameprop(){
  document.getElementById("text1").value = "";
  wrapper.classList.remove("active");
  preValue = "";
  generateBtn.innerText = "Generate QR Code";

  generateBtn.onmouseover = function() {
    setTimeout(() => {
      demo1.style.visibility = 'hidden';
    }, 150);
  }

  document.getElementById("theImage").style.visibility = "visible";
  document.getElementById("btn").style.visibility = "visible";
  document.getElementById("btn1").style.visibility = "visible";
  backH.style.visibility = "hidden";
  generateBtn.style.opacity= "1";
}


function test(e) {
  generateBtn.style.opacity= "1";
  generateBtn.style.cursor="pointer";
}
