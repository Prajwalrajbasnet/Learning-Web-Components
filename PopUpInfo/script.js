/**
 * Autonomous custom element
 */
class PopUpInfo extends HTMLElement {
  constructor() {
    super();

    //crete a shadow root i.e set and return this.shadowRoot
    this.attachShadow({ mode: 'open' });

    //nestedd span elements
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
    const icon = wrapper.appendChild(document.createElement('span'));
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    //Insert icon from defined attribute or default icon
    const img = icon.appendChild(document.createElement('img'));
    img.src = this.hasAttribute('img')
      ? this.getAttribute('img')
      : 'img/default.png';

    const info = wrapper.appendChild(document.createElement('span'));
    info.setAttribute('class', 'info');
    //take attribute content and put it inside the info span
    info.textContent = this.getAttribute('data-text');

    //CSS for shadow dom
    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    //attach created elements to shadow DOM
    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define('popup-info', PopUpInfo);
