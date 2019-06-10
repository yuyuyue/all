const _ = require('lodash')
import './style/index.css' //loader -> css-loader style-loader

function createDomElement() {
  let dom = document.createElement('div')
  dom.innerHTML = _.join(['dda', 'fsdf', 'dfssa'])
  dom.classList.add('box')
  return dom
}

let divDom = createDomElement()

document.body.appendChild(divDom)