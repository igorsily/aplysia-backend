import { Storage } from '@google-cloud/storage';

export default new class GoogleCloudService {

    private storage: Storage;
    private bucketname: string = process.env.BUCKET_NAME;
    private bucket: any;

    constructor() {
        this.storage = new Storage({
            keyFilename: process.env.BUCKET_KEY_FILENAME
        });

        this.bucket = this.storage.bucket(this.bucketname);
    }

    uploadFile = async (file: Express.Multer.File): Promise<string> => {

        const blob = this.bucket.file(file.originalname);

        const blobStream = blob.createWriteStream();

        return new Promise((resolve, reject) => {
            blobStream.on('error', (error) => {
                reject(error);
            });

            blobStream.on('finish', () => {
                resolve(blob.name);
            });

            blobStream.end(file.buffer);
        });

    }

    getUrlFile = async (name: string): Promise<string> => {
        const today = new Date();

        const [signedUrl] = await this.storage.bucket(this.bucketname).file(name).getSignedUrl({
            version: 'v4',
            expires: (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1)),
            action: 'read'
        });

        return signedUrl;
    }

    deleteFile = async (name: string): Promise<void> => {
        await this.storage.bucket(this.bucketname).file(name).delete();
    }

}