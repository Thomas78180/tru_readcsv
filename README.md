# tru_readcsv
A node module that reads a CSV line by line.
 - Start your task with a an array of all plain objects
 - Run async tasks from a plain object on each line then resume the job
 - Optionnal separator. `;` used by default

## License
ISC

## Installation
```javascript
npm install tru_readcsv --save
// or
yarn add tru_readcsv
```
build source with `tsc`

## Usage

### Javascript

```js
var ReadCsv = require('tru_readcsv');

// get all plain objects in an Array
new ReadCsv({
    path: 'myCsv.csv',
    separator: ';', // this is the default separator
    onSuccess: function(data) {
        console.log(data);
    },
    onError: function(err) {
        throw err;
    }
});

// or perform an async task on each line then resume file loading
new ReadCsv({
    path: 'myCsv.csv',
    onData: function(data, resume) {

        // async task
        setTimeout(function() {
            console.log(data);
            resume(); // do not forget to resume
        }, 1000);
    },
    onSuccess: function(dataLength) {
        console.log('dataLength: '+dataLength);
    },
    onError: function(err) {
        throw err;
    }
});

```
### TypeScript

```typescript
import ReadCsv from 'tru_readCsv';

// get all plain objects in an array
new ReadCsv({
    path: 'myCsv.csv',
    onSuccess: (data: any[]) => {
        console.log(data);
    },
    onError: (err: ErrorEvent) => {
        throw err;
    }
});

// or perform an async task on each line then resume csv loading
new ReadCsv({
    path: 'myCsv.csv',
    onData: (data: any, resume: Function) => {

        // async task
        setTimeout(() => {
            console.log(data);
            resume(); // do not forget to resume
        }, 1000);
    },
    onSuccess: (nbObjects: number) => {
        console.log('TOTAL: '+nbObjects);
    },
    onError: (err: ErrorEvent) => {
        throw err;
    }
});

```