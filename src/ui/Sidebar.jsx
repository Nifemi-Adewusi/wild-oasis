import styled from "styled-components";

const StyledSidebar = styled.aside`
    background-color: aliceblue;
    padding: 1.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);

`
function Sidebar() {
    return <StyledSidebar>
        Aside
    </StyledSidebar>
}

export default Sidebar;