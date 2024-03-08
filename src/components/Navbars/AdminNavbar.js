import { useLocation, useNavigate } from "react-router-dom";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import { Navbar, Container, Media, Button, Nav } from "reactstrap";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { auth } from "../../services/firebaseConfig.js";
import { useEffect, useState } from "react";

const AdminNavbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const isHome = location.pathname === "/admin/index";

  const buttonStyle = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    padding: "0",
  };

  const mobileButtonStyle = {
    marginTop: "18px",
    marginLeft: "10px",
  };

  useEffect(() => {
    const cachedUserEmail = sessionStorage.getItem("userEmail");
    if (cachedUserEmail) {
      setUserEmail(cachedUserEmail);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const userEmail = user.email;
          setUserEmail(userEmail);
          sessionStorage.setItem("userEmail", userEmail);
        }
      });
      return () => unsubscribe();
    }
  }, [setUserEmail]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <AuthenticatedLayout>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
          {!isHome && (
            <div>
              <Button
                color="info"
                onClick={handleBackButtonClick}
                style={{
                  ...buttonStyle,
                  ...mobileButtonStyle,
                }}
              >
                <FaRegArrowAltCircleLeft size={30} />
              </Button>
            </div>
          )}
            <div/>
            <Nav
              className="align-items-center d-none d-md-flex justify-content-end"
              navbar
            >
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/medicina.png")}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <p className="mb-0 text-sm font-weight-bold text-white">
                    {userEmail}
                  </p>
                </Media>
              </Media>
            </Nav>
          </Container>
        </Navbar>
      </AuthenticatedLayout>
    </>
  );
};

export default AdminNavbar;