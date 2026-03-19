import { guardarNoLocalStorage } from './localStorage.js';

const selec = document.querySelector('#select')
const rootHtml = document.documentElement

if (!localStorage.TempThemes) rootHtml.removeAttribute('data-theme')

window.addEventListener('DOMContentLoaded', getTheme) 

function getTheme (event) {
  event.preventDefault()

  if ( localStorage.TempThemes ) {

    rootHtml.setAttribute("data-theme", localStorage.TempThemes)
     
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
      rootHtml.removeAttribute("data-theme")
      rootHtml.setAttribute("data-theme", text)
    } 
  }
}