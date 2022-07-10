import {
  CContainer,
  CNavItem,
  CNavLink,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
} from "@coreui/react";

const Header = () => {
  return (
    <>
      <CHeader>
        <CContainer fluid>
          <CHeaderBrand href="#">Header</CHeaderBrand>
          <CHeaderNav>
            <CNavItem>
              <CNavLink href="#" active>
                Announcement
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Badges</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Videos</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Update User Input</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Certificates</CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </>
  );
};

export default Header;
