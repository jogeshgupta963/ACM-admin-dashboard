import { CContainer } from "@coreui/react";

const Header = ({ text }) => {
  return (
    <>
      <CContainer className="header-container">
        <h1>{text}</h1>
      </CContainer>
    </>
  );
};

export default Header;
