export const uploadToCloudinary = async (file) => {

  // ENTERPRISE PLACEHOLDER
  // later real upload API

  return new Promise((resolve)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

};