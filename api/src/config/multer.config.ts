import multer from 'multer';

export const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * (1024 ** 2) // 5 MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido'));
    }
  }
});
