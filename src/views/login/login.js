import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "services/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import Auth from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import useAlert from "../../hooks/useAlert.js";
import logoImg from "../../assets/img/logo.png";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const isFormValid = password.length >= 6 && emailPattern.test(email);

  const [showPassword, setShowPassword] = useState(false);

  const { errorMessage, alertColor, alertTitle, showAlert, handleAlert } =
    useAlert();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (isFormValid) {
      signInWithEmailAndPassword(email, password);
    } else {
      handleAlert(
        "Por favor, insira um email válido e uma senha com pelo menos 6 caracteres.",
        "warning",
        "Atenção!"
      );
    }
  };

  useEffect(() => {
    if (error) {
      handleAlert("E-mail ou senha incorretos", "danger", "Erro!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (loading) {
      handleAlert("Conectando...", "default", "Aguarde:");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (user) {
    return <AdminLayout />;
  }

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
                <h1 className="text-neutral">Bem-vindo(a)!</h1>
                <p className="text-neutral">
                  Insira o seu email cadastrado para logar na sua conta!
                </p>
                {showAlert && (
                  <Alert color={alertColor} className="custom-alert">
                    <strong>{alertTitle}</strong> {errorMessage}
                  </Alert>
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
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          className="ni ni-lock-circle-open"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="senha"
                      placeholder="Senha"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-3"
                    color="default"
                    type="button"
                    onClick={handleSignIn}
                  >
                    Entrar
                  </Button>
                </div>
              </Form>
              <Row className="mt-3">
                <Col className="text-left" xs="6">
                  <Link to="/reset" className="text-darker">
                    <small>Esqueceu sua senha?</small>
                  </Link>
                </Col>
                <Col className="text-right" xs="6">
                  <Link to="/register" className="text-darker">
                    <small>Não possui uma conta?</small>
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

export default Login;
