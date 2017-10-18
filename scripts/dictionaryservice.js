export {DictionaryService}

class DictionaryService {
    constructor() {
        this.DICTIONARY_SERVICE_ENDPOINT = `http://localhost:5000/api/dictionary/`;
    }

    getDictionaryReferences(word){
        console.log('lookup dictionary for ' + word);
        let requestUrl = `https://whatitmeans.azurewebsites.net/api/dictionary/${word}`;
        console.log(requestUrl);

        let myHeaders = new Headers();
        
        let myInit = { method: 'GET',
                       headers: myHeaders,
                       mode: 'cors',
                       cache: 'default' };

        return fetch(requestUrl, myInit)
        .then((r) => {
            if(r.ok) {
              return r.json();
            } else {
              throw new Error('Server response wasn\'t OK');
            }
          })
        .then(dr => {
            return dr;
        })
        .catch(err => console.log(err));
    }

}