
  class CWCSelect extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});     

    }
  
    _updateRendering() {
        const shadow = this.shadowRoot;
        const value = this.getAttribute('value');
        shadow.innerHTML = `<div>
            <select>
                <option>HELLO</option>
            </select>
        </div>`; 
        this._applyStyles();
    }

    _applyStyles() {
        const style = document.createElement('style');
        this.shadowRoot.appendChild(style);
        this.shadowRoot.querySelector('style').textContent = `
            div{
                background-color: blue;
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

  customElements.define("cwc-select", CWCSelect);