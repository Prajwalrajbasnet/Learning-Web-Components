const template = document.createElement('template');
template.innerHTML = `
  <style></style>
  <div class="accordion">
    <div class="header"></div>
    <div class="content">div>
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
