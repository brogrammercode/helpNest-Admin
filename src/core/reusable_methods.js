import { supabase } from "../index";

export class ReUsableMethods {
    static async uploadFileAndGetUrl({ file, path, bucket = "admin" }) {
        try {
            // Validate inputs
            if (!file || !path) {
                throw new Error("File and path are required parameters.");
            }

            console.log("Preparing to upload file:", { path, bucket });

            // Attempt file upload
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(path, file, {
                    cacheControl: "3600",
                    upsert: false, 
                });

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw new Error(`File upload failed: ${uploadError.message}`);
            }

            console.log("File uploaded successfully:", uploadData);

            // Retrieve public URL
            const { data: publicUrlData, error: urlError } = supabase.storage.from(bucket).getPublicUrl(path);

            if (urlError) {
                throw new Error(`Failed to retrieve public URL: ${urlError.message}`);
            }

            const publicUrl = publicUrlData.publicUrl;
            console.log(`File successfully uploaded. Public URL: ${publicUrl}`);
            return publicUrl;
        } catch (error) {
            console.error("Error during file upload process:", error.message);
            throw new Error(`File upload failed: ${error.message}`);
        }
    }
}
