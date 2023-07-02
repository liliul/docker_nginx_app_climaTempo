import { guardarNoLocalStorage } from './localStorage.js';

const selec = document.querySelector('#select')
const body = document.querySelector('body')

window.addEventListener('DOMContentLoaded', getTheme) 

function getTheme (event) {
  event.preventDefault()

  if ( localStorage.TempThemes ) {

    body.classList.add(localStorage.TempThemes)
     
    let op = document.createElement('option')
    op.setAttribute('selected','')
    op.setAttribute('disabled', '')
    op.textContent = localStorage.TempThemes
    op.style.color = 'green'

    selec.appendChild(op)
  }
}

selec.addEventListener('change', selected);

function selected() {

 let isOptionsValue = selec.options[selec.selectedIndex];

 let isText =  isOptionsValue.text;

  guardarNoLocalStorage('TempThemes', isText)
  
  for (const { text } of selec) {   

    if ( isText === text ) {
      body.className = ''; 
      body.classList.add(text)     
    } 
  }
}