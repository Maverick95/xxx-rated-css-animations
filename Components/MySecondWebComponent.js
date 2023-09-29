class MySecondWebComponent extends HTMLParagraphElement
{
  constructor() {
    super();
    this.style.color = "#ffffff";
  }
}

window.customElements.define('custom-paragraph', MySecondWebComponent, { extends: 'p'});