import { supabase } from '../index';

export class ReUsableMethods {
    static async uploadFileAndGetUrl({ file, path, bucket = "admin" }) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(path, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) {
                throw new Error(`File upload failed: ${error.message}`);
            }

            const { publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);

            console.log(`File uploaded successfully! File URL: ${publicUrl}`);
            return publicUrl;
        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }
}