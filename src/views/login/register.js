import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "services/firebaseConfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useAlert from "../../hooks/useAlert.js";

import Auth from "layouts/Auth.js";
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { errorMessage, alertColor, alertTitle, showAlert, handleAlert } =
    useAlert();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const isFormValid = password.length >= 6 && emailPattern.test(email);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      if (password === confirmPassword) {
        try {
          const authUser = await createUserWithEmailAndPassword(
            email,
            password
          );
          if (authUser) {
            handleAlert("Usuário criado com sucesso.", "success", "Sucesso:");
          }
        } catch (error) {
          handleAlert("Falha ao criar usuário", "danger", "Erro!");
        }
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        handleAlert("As senhas não coincidem.", "danger", "Erro!");
      }
    } else {
      handleAlert(
        "Por favor, insira um email válido e uma senha com pelo menos 6 caracteres.",
        "danger",
        "Erro!"
      );
    }
  };

  useEffect(() => {
    if (error) {
      handleAlert("E-mail já está cadastrado", "danger", "Erro!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (loading) {
      handleAlert("Criando conta...", "default", "Aguarde:");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (user) {
      handleAlert("Usuário criado.", "success", "Sucesso:");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                  Crie uma conta para conseguir logar no aplicativo!
                </p>
                {showAlert && (
                  <Alert color={alertColor} className="custom-alert">
                    <strong>{alertTitle}</strong> {errorMessage}
                  </Alert>
                )}
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-3">
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          className="ni ni-lock-circle-open"
                          onClick={togglePasswordVisibilityConfirm}
                          style={{ cursor: "pointer" }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="confirmarSenha"
                      placeholder="Confirmar senha"
                      type={showPasswordConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onPaste={(e) => e.preventDefault()}
                      onCopy={(e) => e.preventDefault()}
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
                    Criar
                  </Button>
                </div>
              </Form>
              <Row className="mt-3">
                <Col xs="6">
                  <Link to="/reset" className="text-darker">
                    <small>Esqueceu sua senha?</small>
                  </Link>
                </Col>
                <Col className="text-right" xs="6">
                  <Link to="/login" className="text-darker">
                    <small>Já possui uma conta!</small>
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

export default Register;
