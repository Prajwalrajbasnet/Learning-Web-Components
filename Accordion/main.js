const template = document.createElement('template');
template.innerHTML = `
  <style></style>
  <div class="accordion">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
`;

class AccordionItem extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: open }).appendChild(
			template.content.cloneNode(true)
		);
	}
}
customElements.define('accordion-item', AccordionItem);
