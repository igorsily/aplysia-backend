
import { randomBytes } from 'crypto';

class FileUtils {

    static renameFile = (name: string): string => {

        const splitName = name.split('.');

        const originalName = splitName[0];

        const extension = splitName[1];

        const hash = randomBytes(16).toString('hex');

        return `${originalName}-${hash}.${extension}`;

    }
}




export default FileUtils;