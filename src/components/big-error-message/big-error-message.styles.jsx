import styled from "styled-components";


export const MessageContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #ffe5e5; /* Light red background */
    padding: 20px;
    border: 1px solid #ffcccc; /* Border color */
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(255, 0, 0, 0.1); /* Optional: adds a subtle shadow */

  
  & .error-symbol {
    font-size: 48px; /* Adjust size as needed */
    color: #ff6666; /* Red color for the symbol */
    margin-bottom: 10px;
  }
  
  & .error-message h2 {
    font-size: 24px;
    color: #cc0000; /* Darker red color for the text */
    margin-bottom: 5px;
  }
  
  & .error-message p {
    font-size: 16px;
    color: #cc0000; /* Darker red color for the text */
    margin: 0;
    text-align: center;
  }
`