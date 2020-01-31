class CWCInput extends HTMLElement {
  constructor() {
    super();
    const  shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
      <style>
        :host *, ::after, ::before {
          box-sizing: border-box;
        }
        :host {
          font-family: 'Open Sans', sans-serif;
        }   
        :host input {
          display: block;
          width: 100%;
          height: calc(1.5em + .75rem + 2px);
          padding: .375rem .75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: .25rem;
          transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }     
      </style>
      <style>
          @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap")
      </style>
      <div></div>
    `;
  }

  _updateRendering() {
      const shadow = this.shadowRoot;
      const value = this.getAttribute('value');
      shadow.querySelector('div').innerHTML = `<input type="text" name="name" value="" />`;
  }

  static get observedAttributes() { return ["name", "value"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }  
  
}

customElements.define("cwc-input", CWCInput);
