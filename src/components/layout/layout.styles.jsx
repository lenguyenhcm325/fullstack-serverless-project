import styled from "styled-components";

export const LayoutContainer = styled.div`

& .top-bar {
    display: flex;
    justify-content: space-between;
}

& .dev-logging {
    display: flex;
    align-items: center;
}

& .buttons-div {
    display: flex;
    gap: 20px;
}

& .login-logout-btn {
    border: 2px solid #343a40;
}

`