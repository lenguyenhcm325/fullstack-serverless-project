import styled, { keyframes } from "styled-components";



const ldsRing = keyframes`
0% {
    transform: rotate(0deg);
  }
100% {
    transform: rotate(360deg);
  }

`

export const LoadingSpinnerContainer = styled.div`
    position: fixed; 
    top: 0;
    left: 0;
    width: 20%; 
    height: 20%;
    background-color: rgba(0,0,0,0.1);
    backdrop-filter: blur(5px);
    display: inline-block;


& div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 4px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    border: 4px solid #fff;
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
& div:nth-child(1) {
    animation-delay: -0.45s;
  }
& div:nth-child(2) {
    animation-delay: -0.3s;
  }
& div:nth-child(3) {
    animation-delay: -0.15s;
  }

  
`