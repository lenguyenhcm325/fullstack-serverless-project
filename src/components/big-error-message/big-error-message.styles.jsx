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
    background-color: #ffe5e5;
    padding: 20px;
    border: 1px solid #ffcccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(255, 0, 0, 0.1);

  
  & .error-symbol {
    font-size: 48px;
    color: #ff6666;
    margin-bottom: 10px;
  }
  
  & .error-message h2 {
    font-size: 24px;
    color: #cc0000;
    margin-bottom: 5px;
  }
  
  & .error-message p {
    font-size: 16px;
    color: #cc0000;
    margin: 0;
    text-align: center;
  }
`