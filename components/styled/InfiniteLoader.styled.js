import styled from 'styled-components';

export const ToggleVisibleButton = styled.button`
    height: 50px;
`;

// looks like duplication of ToggleVisibleButton, but defined again for the future update.
// We might need to have ToggleVisibleButton and AdminAccessButton with different style.
export const AdminAccessButton = styled.button`
    height: 50px;
    margin-left: 8px;
`;
