const template = document.createElement('template');
template.innerHTML = `
  <style>
    *{
      font-family: 'Open Sans', sans-serif;
    }
    #header{
      display: flex;
      justify-content: space-between;
      padding: 15px 20px;
      background-color: #edece8;
      border: 1px solid #404040;
      border-radius: 4px;
      cursor: pointer;
    }
    .content{
      margin-left: 20px;
      display: none;
    }
    .content-active{
      display: block;
    }
  </style>
  <div class="accordion">
    <div id="header">
      <slot name="header"></slot>
      <i id="indicator" class="fas fa-chevron-right"></i>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
`;

class AccordionItem extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' }).appendChild(
			template.content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.setAttribute('data-open', false);

		const styles = document.querySelector('link[href*="font-awesome"]');
		if (styles) {
			this.shadowRoot.appendChild(styles.cloneNode());
		}

		const header = this.shadowRoot.querySelector('#header');
		const content = this.shadowRoot.querySelector('.content');
		const indicator = this.shadowRoot.querySelector('#indicator');

		header.addEventListener('click', () => {
			content.classList.toggle('content-active');
			if (this.getAttribute('data-open') === 'false') {
				this.setAttribute('data-open', true);
				indicator.classList = 'fas fa-chevron-down';
			} else {
				this.setAttribute('data-open', false);
				indicator.classList = 'fas fa-chevron-right';
			}
		});
	}
}
customElements.define('accordion-item', AccordionItem);
