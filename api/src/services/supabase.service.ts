import { supabaseConfig } from 'src/config/supabase.config';

export async function uploadCertificatePdf(file: FileType, path: string) {
  return supabaseConfig
    .storage
    .from('certificates')
    .upload(path, file.buffer, { contentType: file.mimetype });
}
