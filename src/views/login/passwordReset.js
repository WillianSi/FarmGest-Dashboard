import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "services/firebaseConfig";

import logoImg from "../../assets/img/logo.png";
import useAlert from "../../hooks/useAlert.js";

import Auth from "layouts/Auth.js";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const isFormValid = emailPattern.test(email);

  const { errorMessage, alertColor, alertTitle, showAlert, handleAlert } =
    useAlert();

  const resetPassword = (e) => {
    if (isFormValid) {
      e.preventDefault();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          handleAlert(
            "Verifique seu e-mail para obter instruções de redefinição de senha.",
            "success",
            "Sucesso!"
          );
          setEmail("");
        })
        .catch(() => {
          handleAlert(
            "Por favor, insira um email válido.",
            "warning",
            "Atenção!"
          );
        });
    } else {
      handleAlert(
        "Falha ao resetar a senha insira um email valido.",
        "danger",
        "Erro!"
      );
    }
  };

  return (
    <>
      <Auth corDeFundo="#87CEFA">
        <Col lg="5" md="7">
          <Card
            style={{ borderRadius: "30px" }}
            className="bg-secondary shadow border-0 bg-image-login"
          >
            <CardHeader className="bg-transparent">
              <div className="header-body text-center">
                <img src={logoImg} alt="Logo" className="image-style" />
                <h1 className="text-neutral">Esqueceu sua senha?</h1>
                <p className="text-neutral">
                  {" "}
                  Insira o seu email cadastrado para redefinir sua senha!
                </p>
                {showAlert && (
                  <div
                    className="position-absolute top-9 start-50 translate-middle"
                    style={{ maxWidth: "400px", width: "90%" }}
                  >
                    <Alert color={alertColor} className="custom-alert">
                      <strong>{alertTitle}</strong> {errorMessage}
                    </Alert>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="email"
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-3"
                    color="default"
                    type="button"
                    onClick={resetPassword}
                  >
                    Redefinir senha
                  </Button>
                </div>
              </Form>
              <Row className="mt-3 justify-content-center">
                <Col className="text-center" xs="6">
                  <Link to="/login" className="text-darker">
                    <small>Logar na conta!</small>
                  </Link>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Auth>
    </>
  );
};

export default PasswordReset;
