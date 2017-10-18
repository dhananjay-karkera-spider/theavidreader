export { DictionaryWidget }

class DictionaryWidget extends HTMLElement {

    constructor(word, category, definition) {
        super();

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
        return this.hasAttribute('word');;
    }

    set word(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('word', val);
        } else {
            this.removeAttribute('word');
        }
    }

    // A getter/setter for an open property.
    get category() {
        return this.hasAttribute('category');
    }

    set category(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
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
            this.setAttribute('definition', val);
        } else {
            this.removeAttribute('definition');
        }
    }

    static get observedAttributes() {
        return ['word', 'category', 'definition'];
    }

    connectedCallback() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        //this.setAttribute(attrName, newVal);        
    }
}