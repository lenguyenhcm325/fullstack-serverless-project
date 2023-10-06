import React, {useState} from "react";
import uploadToS3 from "../../utils/upload-to-s3";
const UploadProfilePic = ({userId}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const handleImageChange = (e) => {
      const uploadedFile = e.target.files[0]
        if (uploadedFile) {
          setFile(uploadedFile);
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log("below is file")
            console.log(e);
            console.log(e);
            console.log(e);
            console.log(e);
            setSelectedImage(e.target.result);
          };
          reader.readAsDataURL(uploadedFile);
        }
      };


    return (
    <div>
      <input id="pic-upload" type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} alt="Preview" />}
      {selectedImage && (
        <button id="add-pic" onClick={() => {
            // console.log(selectedImage)
            uploadToS3(file, userId)}}>Upload to S3</button>
      )}
    </div>


    )
}


export default UploadProfilePic; 