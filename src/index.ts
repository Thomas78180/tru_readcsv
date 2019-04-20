import ReadFile from 'tru_readfile';

export interface ICsvReader {
    path: string;
    separator?: string;
    onData?(data: any, resume: Function): void;
    onSuccess(data: Array<any> | number): void;
    onError(err: ErrorEvent): void;
}

export default class CsvReader extends ReadFile {

    private lineCount: number = 0;
    private dataDescription: any;
    private data: Array<any> = [];

    constructor(options: ICsvReader) {
        super({
            path: options.path,
            onLine: (line, resume) => {

                const data = line.split(options.separator || ';');
                
                if(!this.dataDescription) {
                    
                    this.dataDescription = {};
                    
                    for(let i = 0, j = data.length; i < j ; i++) {
                        this.dataDescription[i] = data[i];
                    }
                    return resume();
                }
                
                this.lineCount++;
                const dataObject: any = {};

                for(let i = 0, j = Object.keys(this.dataDescription).length; i < j; i++) {
                    dataObject[this.dataDescription[i]] = data[i];
                }

                if(!options.onData) {
                    this.data.push(dataObject);
                    return resume();
                }
                
                options.onData(dataObject, resume);
            },
            onSuccess: () => {
                if(!options.onData) {
                    return options.onSuccess(this.data);
                }
                options.onSuccess(this.lineCount);
            },
            onError: (err) => {
                throw err;
            }
        });
    }
}