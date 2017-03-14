export class AssetObj {
    public file: File;
    public url: string = '';
    public isUploading: boolean = false;
    public progress: number = 0;
    public count: number;

    public constructor(file: File, count: number) {
        this.file = file;
        this.count = count;
    }
}