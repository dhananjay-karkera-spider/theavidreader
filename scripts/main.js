export { AppController }
import { DictionaryService } from './dictionaryService.js'
import { DictionaryWidget } from './dictionarywidget.js'

class AppController {

    constructor() {
        this.referenceCount = 1;
        this.wordPattern = /^[a-z]+$/i;
        this.ds = new DictionaryService();
        this.addEventListeners();
        this.addWidgets();
    }

    addEventListeners() {
        let me = this;
        document.querySelector('.content').addEventListener('dblclick', function (e) {
            me.searchWord(e);
        });
    }

    addWidgets() {
        window.customElements.define('dictionary-widget', DictionaryWidget);
    }

    searchWord(e) {
        let selection = this.getCollapsedSelection();
        let selectedWord = selection.toString().toLowerCase();
        if (this.isValid(selectedWord)) {
            this.ds.getDictionaryReferences(selectedWord)
                .then(result => {
                    this.addToWordList(selectedWord, result.definition);
                });
            this.addCrossReference(selection);
            this.referenceCount++;
        }
    }

    //Trim the spaces at the end of the selection
    getCollapsedSelection() {
        let selection = window.getSelection();
        let content = selection.toString();

        if (/\s+$/.test(content)) {
            let r = selection.getRangeAt(0);
            let clonedRange = r.cloneRange();
            //let contentLength = content.length - content.match(/\s+$/).length;            
            clonedRange.setEnd(clonedRange.endContainer, clonedRange.endOffset - content.match(/\s+$/).length)
            console.log(clonedRange.endContainer.textContent);
            selection.removeAllRanges();
            selection.addRange(clonedRange);
        }
        console.log('end of getCollapsedSelection:' + selection.toString() + ' length:' + selection.toString().length);
        return selection;
    }


    addToWordList(word, dictionaryReferences) {
        let wordList = document.querySelector('#wordList');
        dictionaryReferences.forEach(dr => {
            let category = this.getLexicalCategory(dr.lexicalCategory.trim());
            let dw = new DictionaryWidget(word, category, dr.definitions[0]);
            wordList.appendChild(dw);
            if (dr.moreEntries != null) {
                dr.moreEntries.forEach(_ => {
                    let m = new DictionaryWidget(word, category, _.definitions[0]);
                    wordList.appendChild(m);
                });
            }
        });
    }

    getLexicalCategory(category) {
        let result = category.toLowerCase();
        /*if (category.match(/^noun/i))
            result = 'n';
        else if(category.match(/^verb/i))
            result = 'v';
        else if(category.match(/^adj/i))
            result = 'adj';
        else if(category.match(/^adv/i))
            result = 'adv';*/
        return `(${result})`;
    }

    
    isValid(selection) {
        if (selection === null || selection === undefined)
            return false;

        return this.wordPattern.test(selection);
    }

    addCrossReference(selection) {
        console.log('adding text decoration');
        let mark = document.createElement('span');
        mark.setAttribute('class', 'selectedword');
        mark.innerText = selection.toString();

        let crossReference = document.createElement('sup');
        crossReference.setAttribute('class', 'superscriptlink');
        let reference = document.createTextNode(this.referenceCount);
        crossReference.appendChild(reference);

        let r = selection.getRangeAt(0);
        r.surroundContents(mark);
        //r.collapse(false);
        //r.insertNode(crossReference);
    }
}