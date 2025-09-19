import multer from 'multer';
import path from 'path';

interface MulterFile {
    originalname: string;
    filename: string,
    fieldname: string
}

interface MulterCallback {
    (error: Error | null, filename: string): void;
}

interface MulterRequest {}

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req: MulterRequest, file: MulterFile, cb: MulterCallback): void => {
        cb(null, `${file.filename ? file.filename : file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});
