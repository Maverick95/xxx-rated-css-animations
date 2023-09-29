class MyFirstWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Hello! I am your first web component!';
    this.shadowRoot.appendChild(paragraph);
  }
};

window.customElements.define('my-first-wc', MyFirstWebComponent);