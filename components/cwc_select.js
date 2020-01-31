
class CWCSelect extends HTMLElement {
  constructor() {
    super();
    this.documentClick = this.documentClick.bind(this);
    const  shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
      <style>
          @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap")
      </style>
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
        :host ul li {
          font-size: 1rem;
          font-weight: 400;
        } 
        :host .menu-container{
        }
        :host .menu-list{
          display: none;
          line-height: 1.8;
          border-top: 1px solid #CCC;
          border-left: 1px solid #CCC;
          border-right: 1px solid #CCC;
          position: absolute;
          width: 97.5%;
          background: #f7f7f7;
        }  
        :host .menu-list div{
          border-bottom: 1px solid #CCC;
          padding: 5px;
        }
        :host .menu-list div:hover{
          background-color: red;
        }
        :host .menu-list.show{
          display: block;
        }
      </style>
      <div class="menu-container">
        <div>
          <input type="text" readonly value="" />            
        </div>
        <div class="menu-list" >
          <div >ONE</div>
          <div >TWO</div>
          <div >THREE</div>
        </div>
      </div>
    `;
    shadow.querySelector('input').addEventListener('click', () => {
      this.toggelMenuList(this)
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

  toggelMenuList(elem) {
    const shadow = elem.shadowRoot;
    const menulist = shadow.querySelector('.menu-list');
    if(menulist.classList.contains('show')){
      shadow.querySelectorAll('.menu-list div').forEach((item) => {
        item.removeEventListener('click', elem.getSelectValue);
      })
      menulist.classList.remove('show');
    }else{
      document.addEventListener('click', elem.documentClick);
      setTimeout(() => {
        menulist.classList.add('show');
        shadow.querySelectorAll('.menu-list div').forEach((item) => {
          item.addEventListener('click', elem.getSelectValue);
        });
      },100)
    }
  }

  getSelectValue(e) {
    e.stopPropagation();
    console.log(e.target)
  }


  _updateRendering() {

  }

  _applyStyles() {
  }

  static get observedAttributes() { return ["name", "value"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    //this._updateRendering();
  }
  connectedCallback() {
    //this._updateRendering();
  } 
  
}

customElements.define("cwc-select", CWCSelect);