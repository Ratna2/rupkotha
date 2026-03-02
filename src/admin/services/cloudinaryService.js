export const uploadToCloudinary = async (file) => {
  const CLOUD_NAME = "dzw2vjrlu";
  const UPLOAD_PRESET = "rupkotha_products";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // 🔥 AUTO DETECT IMAGE / VIDEO
  const isVideo = file.type.startsWith("video");

  const resourceType = isVideo ? "video" : "image";

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Upload failed");
  }

  return data.secure_url;
};