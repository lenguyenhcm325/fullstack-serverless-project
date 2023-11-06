import React, {useState} from "react";
import { selectJwtToken, selectUserInfo } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { UploadProfilePicContainer } from "./upload-profile-pic.styles";
import handleSubmitToS3 from "../../utils/upload-to-s3";
const UploadProfilePic = () => {
    const userInfo = useSelector(selectUserInfo)
    const userId = userInfo.userId
    const jwtToken = useSelector(selectJwtToken);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadSuccessful, setUploadSuccessful] = useState(false);
    const [showUploadStatus, setShowUploadStatus] = useState(false);
    const [file, setFile] = useState(null);
    const handleImageChange = (e) => {
      setShowUploadStatus(false);
      const uploadedFile = e.target.files[0]
        if (uploadedFile) {
          setFile(uploadedFile);
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedImage(e.target.result);
          };
          reader.readAsDataURL(uploadedFile);
        }
      };
      const handleClick = async () => {
        setShowUploadStatus(false);
        const returnStatus = await handleSubmitToS3({jwtToken, file, userId});
        setShowUploadStatus(true);
        if (returnStatus === "upload_successful"){
          setUploadSuccessful(true)
        }
        else {
          setUploadSuccessful(false)
        }

      }

    

    return (
    <UploadProfilePicContainer>
      <input id="pic-upload" type="file" accept="image/*" onChange={handleImageChange} />
      <label htmlFor="pic-upload" className="custom-file-upload">
          Choose file
      </label>  
      {selectedImage && <img className="preview-image" src={selectedImage} alt="Preview" />}
      {
        showUploadStatus && (
          uploadSuccessful ? (
            <div className="successful-msg-div"><p>Upload successful!</p></div>
          ) : (

            <div className="failed-msg-div"><p>Upload failed, please try again later.</p></div>
          )
        )
      }
      {selectedImage && (
        <button className="add-pic" onClick={handleClick}>Upload Profile Pic</button>
      )}
    </UploadProfilePicContainer>
    )
}


export default UploadProfilePic; 