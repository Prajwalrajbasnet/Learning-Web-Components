/**
 * Program to demonstrate lifecycle callbacks of component
 */

//defining autonomous custom element named square
class Square extends HTMLElement {
  /**
   * @returns array of attributes of element
   * only the attibutes returned by this static method will be able to invoke attributeChangedCallback
   */
  static get observedAttributes() {
    return ['len', 'color'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(document.createElement('div'));
    this.shadowRoot.appendChild(document.createElement('style'));
  }

  //lifecycle callback which gets called when square is appended to the document
  connectedCallback() {
    console.log('New custom-square component added successfully');
    updateStyles(this);
  }

  //lifecycle callback which gets called when square is removed from the document
  disconnectedCallback() {
    console.log('custom-square removed from the document');
  }

  //lifecycle callback which gets called everytime the value of any observed attribute changes
  attributeChangedCallback(attribute, oldValue, newValue) {
    console.log('Styles of the custom-square modified successfully');
    updateStyles(this);
  }
}

customElements.define('custom-square', Square);

/**
 * @param  {number} min - Minimum limit for the random number
 * @param  {number} max - Maximum limit for the random number
 * @returns {nubmer} - Random value in given range
 * utility function to generate whole number between given parameters
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateStyles(element) {
  const shadow = element.shadowRoot;
  const style = shadow.querySelector('style');
  style.textContent = `
    div{
      width: ${element.getAttribute('len')}px;
      height: ${element.getAttribute('len')}px;
      background-color: ${element.getAttribute('color')}; 
    }
  `;
}

const create = document.getElementById('create');
const modify = document.getElementById('modify');
const remove = document.getElementById('remove');
let square;

modify.disabled = true;
remove.disabled = true;

create.onclick = () => {
  square = document.createElement('custom-square');
  square.setAttribute('len', '90');
  square.setAttribute('color', 'blue');
  document.body.appendChild(square);

  create.disabled = true;
  modify.disabled = false;
  remove.disabled = false;
};

modify.onclick = () => {
  square.setAttribute('len', randomNum(80, 300));
  square.setAttribute(
    'color',
    `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`
  );
};

remove.onclick = () => {
  document.body.removeChild(square);
  create.disabled = false;
  modify.disabled = true;
  remove.disabled = true;
};
