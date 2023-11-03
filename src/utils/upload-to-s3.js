const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;

const fetchPreSignedS3URL = async (jwtToken) => {
  const apiUrl = `${apiEndpoint}/presignedurl/profilepic`;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  if (!response.ok) {
    console.error("Error uploading image to S3");
    throw new Error("Something went wrong!");
  }
  const result = await response.json();
  return result.url;
};

const handleSubmitToS3 = async (jwtToken, file) => {
  try {
    const preSignedURL = await fetchPreSignedS3URL(jwtToken);
    const response = await fetch(preSignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": "image/*",
      },
      body: file,
    });

    if (!response.ok) {
      return "upload_failed";
    }
    return "upload_successful";
  } catch (err) {
    console.error(err);
    return "upload_failed";
  }
};

export default handleSubmitToS3;
