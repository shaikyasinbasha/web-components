
// <------------- Start cwc_input.js------------>
class CWCInput extends HTMLElement {
  constructor() {
    super();
    const  shadow = this.attachShadow({mode: 'open'}); 
    shadow.innerHTML = `
      <style>
        :host *, ::after, ::before {
          box-sizing: border-box;
          font-family: 'Zhi Mang Xing', cursive;
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
        @import url('https://fonts.googleapis.com/css?family=Zhi+Mang+Xing&display=swap');
      </style>
      <div>
        <input type="text" name="name" value="" />
      </div>
    `;

    shadow.querySelector('input').addEventListener('keyup', (event) => {
      shadow.dispatchEvent(new CustomEvent('cwc-keyup', {
        composed: true,
        detail: { value: event.target.value }
      }));
    });

  }

  _updateRendering() {
      const shadow = this.shadowRoot;
      const value = this.getAttribute('value');
      shadow.querySelector('input').value = value;
         
      const type = this.getAttribute('type');
      shadow.querySelector('input').type = type;
  }

  static get observedAttributes() { return ["name", "value", "type"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }  
  
}

customElements.define("cwc-input", CWCInput);

// <------------- End cwc_input.js------------>

// <------------- Start cwc_select.js------------>

class CWCSelect extends HTMLElement {
  constructor() {
    super();
    this.documentClick = this.documentClick.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
    this.toggelMenuList = this.toggelMenuList.bind(this);

    const  shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
      <style>
          @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap")
      </style>
      <style>
        :host *, ::after, ::before {
          box-sizing: border-box;          
          font-family: 'Open Sans', sans-serif;
        }
        :host{
          font-size: 12px;
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
        
        :host .menu-list{
          display: none;
          line-height: 1.8;
          border-top: 1px solid #CCC;
          border-left: 1px solid #CCC;
          border-right: 1px solid #CCC;
          position: absolute;
          left: 8px;
          right: 8px;
          background: #fdfdfd;
        }  
        :host .menu-list div{
          border-bottom: 1px solid #CCC;
          padding: 5px;
        }
        :host .menu-list div:not(.menu-button):hover{
          background-color: #f7f7f7;
        }
        :host .menu-list.show{
          display: block;
        }
        :host .hide{
          display: none !important;
        }
        :host .menu-button{
          display: flex;
          justify-content: space-between;
        }
        :host .btn {
          display: inline-block;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          border: 1px solid transparent;
          padding: .375rem .75rem;
          line-height: 1.5;
          border-radius: .25rem;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        :host .btn-primary {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
        }
        :host .btn-second {
          color: #000;
          background-color: #FFF;
          border-color: #ccc;
      }
      </style>
      <div class="menu-container">
        <div class="menu-select">
          <input type="text" readonly value="" placeholder="Select" />            
        </div>
        <div class="menu-list" >
          <span class="menu-each-item">
          </span>
          <div class="menu-button hide">
            <button class="btn btn-second">Cancel</button>
            <button class="btn btn-primary">Apply</button>
          </div>        
        </div>
      </div>
    `;
    shadow.querySelector('input').addEventListener('click', this.toggelMenuList);
    shadow.querySelector('button').addEventListener('click', () => {
      console.log("button")
    });
  }

  documentClick() {
    const shadow = this.shadowRoot;
    const menulist = shadow.querySelector('.menu-list');
    if(menulist.classList.contains('show')){
      menulist.classList.remove('show');
      document.removeEventListener('click', this.documentClick);
    }
  }

  toggelMenuList() {
    const shadow = this.shadowRoot;
    const menulist = shadow.querySelector('.menu-list');
    if(menulist.classList.contains('show')){
      menulist.classList.remove('show');
    }else{
      document.addEventListener('click', this.documentClick);
      setTimeout(() => {
        menulist.classList.add('show');
      },10)
    }
  }

  getSelectValue(e) {
    e.stopPropagation();
    const classs = e.target.classList;
    if (classs.contains('menu-button') || classs.contains('btn')) {
      return;
    }
    const shadow = this.shadowRoot;
    const inputText = shadow.querySelector('input');
    inputText.value = e.target.textContent;
    if(this.getAttribute('multi') === null){      
      this.toggelMenuList();
    }
  }

  _updateRendering() {
    const shadow = this.shadowRoot;
    shadow.querySelectorAll('.menu-list div').forEach((item) => {
      item.addEventListener('click', this.getSelectValue);
    });

    const menulist = shadow.querySelector('.menu-each-item');
    const options = JSON.parse(this.getAttribute('options'));
    //let optionHTML = "";
    menulist.innerHTML = options.map((x) => ("<div>"+x.label+"</div>"));

    //menulist.innerHTML = optionHTML;
    shadow.querySelectorAll('.menu-list div').forEach((item) => {
      item.addEventListener('click', this.getSelectValue);
    });

    if(this.getAttribute('multi') !== null){
      shadow.querySelector('.menu-button').classList.remove('hide');
    }
  }

  _applyStyles() {

  }

  static get observedAttributes() { return ["name", "options"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    this._updateRendering();
  }
  connectedCallback() {
    //this._updateRendering();
  } 
  
}

customElements.define("cwc-select", CWCSelect);

// <------------- End cwc_select.js------------>
