import axios from "axios";

export const uploadImageToIPFS = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key:
              process.env.NEXT_PUBLIC_PINATA_API_SECRET_KEY,
          },
        }
      );

      const cid = response.data.IpfsHash;
      return cid;
    } catch (error) {}
  };