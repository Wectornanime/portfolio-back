export default function generateFileNames(file: FileType): string {
  const ext = file.originalname.split('.').pop();
  return `${crypto.randomUUID()}.${ext}`;
}
