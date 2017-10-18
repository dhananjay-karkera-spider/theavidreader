export { DictionaryWidget }

class DictionaryWidget extends HTMLElement {
    //constructor() {
    constructor(word, category, definition) {
        super();

        console.log('creating dictionarywidget');
        this.word = word;
        this.category = category;
        this.definition = definition;
        
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(this.getContentLayout(word, category, definition));
    }

    getContentLayout(word, category, definition) {
        const t = document.querySelector('#dictionary-widget-template');
        const instance = t.content.cloneNode(true);
        instance.querySelector('.dictionary-widget-template-word').innerText = word;
        instance.querySelector('.dictionary-widget-template-category').innerText = category;
        instance.querySelector('.dictionary-widget-template-definition').innerText = definition;
        return instance;
    }

    // A getter/setter for an open property.
    get word() {
        console.log('get word');
        return this.hasAttribute('word');;
    }

    set word(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            console.log('get word');
            this.setAttribute('word', val);
        } else {
            this.removeAttribute('word');
        }
    }

    // A getter/setter for an open property.
    get category() {
        console.log('get category');
        return this.hasAttribute('category');
    }

    set category(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            console.log('category')
            this.setAttribute('category', val);
        } else {
            this.removeAttribute('category');
        }
    }

    // A getter/setter for an open property.
    get definition() {
        return this.hasAttribute('definition');
    }

    set definition(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            console.log('get definition');
            this.setAttribute('definition', val);
        } else {
            this.removeAttribute('definition');
        }
    }

    static get observedAttributes() {
        return ['word', 'category', 'definition'];
    }

    connectedCallback() {
        console.log('connectedCallback');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(attrName + ' changed from ' + oldVal + ' to ' + newVal);
        //this.setAttribute(attrName, newVal);        
    }
}