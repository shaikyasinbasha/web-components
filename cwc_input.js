class CWCInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});     

    }
  
    _updateRendering() {
        const shadow = this.shadowRoot;
        const value = this.getAttribute('value');
        shadow.innerHTML = `<div><input type="text" name="name" value="" /></div>`; 
        this._applyStyles();
    }

    _applyStyles() {
        const style = document.createElement('style');
        this.shadowRoot.appendChild(style);
        this.shadowRoot.querySelector('style').textContent = `
            div{
                background-color: red;
                padding: 10px;
            }
        `;
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

