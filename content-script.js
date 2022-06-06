// wait for the entire load of site
// window.addEventListener('loadstart', () => {
// create floater div
const floaterDiv = document.createElement('div')
const containerDiv = document.createElement('div')
const contentDiv = document.createElement('div')
const priceSpan = document.createElement('span')
const closeSpan = document.createElement('span')
priceSpan.innerHTML = '---'
priceSpan.id = 'crypto-price'
closeSpan.innerHTML = 'x'
closeSpan.id = 'crypto-close'

contentDiv.appendChild(priceSpan)
contentDiv.appendChild(closeSpan)
containerDiv.appendChild(contentDiv)
floaterDiv.appendChild(containerDiv)
document.body.appendChild(floaterDiv)

floaterDiv.style.cssText = `
  position: absolute;
  top: 0px;
  right: 0px;
  margin-right: 150px;
  z-index: 9999;
`

containerDiv.style.cssText = `
  position: fixed;
  right: 0;
  background-color: #f1f1f1;
  border: 0;
  text-align: center;
  width: 150px;
`

contentDiv.style.cssText = `
  padding: 10px;
  cursor: move;
  background-color: #000;
  color: #fff;
`
closeSpan.style.cssText = `
  position: absolute;
  top: 1px;
  right: 3px;
  cursor: default;
`
containerDiv.id = 'crypto-container-div'
contentDiv.id = 'crypto-content-div'

console.log('adicionei floater div')

dragElement(document.getElementById('crypto-container-div'))

function dragElement(elmnt) {
  let [pos1, pos2, pos3, pos4] = [0, 0, 0, 0]
  if (document.getElementById('crypto-content-div')) {
    document.getElementById('crypto-content-div').onmousedown = dragMouseDown
  } else {
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }
}

document.getElementById('crypto-close').addEventListener('click', () => {
  document.getElementById('crypto-container-div').hidden = true
})

chrome.runtime.onMessage.addListener((r) => {
  document.getElementById('crypto-price').innerHTML = `USD ${r.price}`
})

console.log('iniciei crypto monitor')
// })
