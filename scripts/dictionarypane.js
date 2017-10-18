export { DictionaryPane }

class DictionaryPane extends HTMLElement  {
    constructor() {
        super();

        this.collapsed = false;
    }

    toggleDisplay() {
        this.setAttribute('class', 'collapsed');
    }
}