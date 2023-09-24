export const uploadToCloudinary = async (file, folder, user) => {
    const cloudinary = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); 
        formData.append('folder', `${folder}/${user}`);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = `Error al subir la imagen a Cloudinary: ${response.status} - ${await response.text()}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        return { secure_url: data.secure_url, public_id: data.public_id };
    } catch (error) {
        console.error('Error en uploadToCloudinary:', error);
        throw error;
    }
    
};