/**
 * Autonomous web component made using template and slot html elements
 */
class ElementDoc extends HTMLElement {
  constructor() {
    super();
    const elementTemplateContent = document.getElementById(
      'element-doc-template'
    ).content;
    const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(
      elementTemplateContent.cloneNode(true)
    );
  }
}
customElements.define('element-doc', ElementDoc);
