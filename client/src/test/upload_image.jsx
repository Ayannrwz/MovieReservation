import React, { useEffect, useState } from "react";

const ImageUploadForm = () => {
  const [imageURL, setImageURL] = useState("");

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/uploads/ayan.jpg"
//         ); // Replace with your image path
//         if (response.ok) {
//           const blob = await response.blob();
//           const objectURL = URL.createObjectURL(blob);
//           setImageURL(objectURL);
//         } else {
//           console.error("Failed to fetch image");
//         }
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     };

//     fetchImage();
//   }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleImageUpload} />

      {/* <h2>Display Image</h2>
      {imageURL && <img src={imageURL} alt="Uploaded" style={{ maxWidth: '100%' }} />} */}
    </div>
  );
};

export default ImageUploadForm;
