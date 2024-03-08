import React, { useState } from "react";
import AuthenticatedLayout from "services/AuthenticatedLayout";
import Header from "components/Headers/Header.js";
import useAlert from "../../hooks/useAlert.js";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig.js";
import {
  opcoesStatus,
  viasAdministracao,
  tiposMedicamento,
  classesFarmacologicas,
  unidadesDosagem,
  faixasEtarias,
  unidadesMedida,
} from "../filter/filters.js";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();
  const { errorMessage, alertColor, alertTitle, showAlert, handleAlert } =
    useAlert();

  const [data, setData] = useState({
    nome: "",
    via_administracao: "",
    tipo_Medicamento: "",
    classe_farmacologica: "",
    faixa_etaria: "",
    status: "",
    contraindicacoes: "",
    dosage: {
      numeroDosagem: "",
      unidadeDosagem: "",
    },
    quantidade: {
      quantidadeEstoque: "",
      unidadeEstoque: "",
    },
  });

  const [lot, setLot] = useState([
    { id: "", numero: "", validade: "", quantidade: "", unidade: "" },
  ]);

  const [nextId, setNextId] = useState(2);

  const buttonStyle = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    padding: "0",
  };

  const addRow = () => {
    const newId = nextId;
    setLot((prevLot) => [
      ...prevLot,
      {
        id: newId,
        numero: "",
        validade: "",
        quantidade: "",
        unidade: "",
      },
    ]);
    setNextId(newId + 1);
  };

  const removeRow = (idToRemove) => {
    setLot((prevLot) => prevLot.filter((lot) => lot.id !== idToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data };
    if (name === "numeroDosagem" || name === "unidadeDosagem") {
      updatedData.dosage[name] = value;
    } else if (name === "quantidadeEstoque" || name === "unidadeEstoque") {
      updatedData.quantidade[name] = value;
    } else {
      updatedData[name] = value;
    }
    setData(updatedData);
  };

  const handleChangeLote = (id, field, value) => {
    setLot((prevLot) =>
      prevLot.map((lot) => (lot.id === id ? { ...lot, [field]: value } : lot))
    );
  };

  const handleClearForm = () => {
    setData({
      nome: "",
      via_administracao: "",
      tipo_Medicamento: "",
      classe_farmacologica: "",
      faixa_etaria: "",
      status: "",
      contraindicacoes: "",
      dosage: {
        numeroDosagem: "",
        unidadeDosagem: "",
      },
      quantidade: {
        quantidadeEstoque: "",
        unidadeEstoque: "",
      },
    });

    setLot([
      {
        id: 1,
        numero: "",
        validade: "",
        quantidade: "",
        unidade: "",
      },
    ]);

    setNextId(2);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCanceled = () => {
    setData({
      nome: "",
      via_administracao: "",
      tipo_Medicamento: "",
      classe_farmacologica: "",
      faixa_etaria: "",
      status: "",
      contraindicacoes: "",
      dosage: {
        numeroDosagem: "",
        unidadeDosagem: "",
      },
      quantidade: {
        quantidadeEstoque: "",
        unidadeEstoque: "",
      },
    });

    setLot([
      {
        id: 1,
        numero: "",
        validade: "",
        quantidade: "",
        unidade: "",
      },
    ]);

    setNextId(2);
    navigate('/admin/index');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "inventoryMedications"), {
        dataMedications: data,
        lotMedications: lot,
      });

      handleClearForm();
      handleAlert("Medicação adicionada.", "success", "Sucesso:");
    } catch (e) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleAlert("Ao adicionar medicação.", "danger", "Erro:");
    }
  };

  return (
    <>
      <AuthenticatedLayout>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="mb-3">
            <Col className="order-xl-1" xl="12">
              <div
                className="d-flex justify-content-between align-items-center mb-3"
                style={{ color: "white", fontSize: "30px" }}
              >
                <span style={{ marginLeft: "40px" }}>Adicionar</span>
              </div>
              <Card className="bg-secondary shadow cardStyle">
                <div className="floating-alert">
                  {showAlert && (
                    <Alert color={alertColor}>
                      <strong>{alertTitle}</strong> {errorMessage}
                    </Alert>
                  )}
                </div>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <div className="pl-lg-4">
                      <h6 className="heading-small text-muted mb-4">
                        Informação do Medicamento
                      </h6>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-nome"
                            >
                              Nome do Medicamento
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              type="text"
                              name="nome"
                              value={data.nome}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-via-administracao"
                            >
                              Via de administração
                            </label>
                            <select
                              className="form-control form-control-alternative"
                              id="input-via-administracao"
                              name="via_administracao"
                              value={data.via_administracao}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Selecione uma opção</option>
                              {viasAdministracao.map((via, index) => (
                                <option key={index} value={via}>
                                  {via}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="tipo-Medicamento"
                            >
                              Tipo de Medicamento
                            </label>
                            <select
                              className="form-control form-control-alternative"
                              id="tipo-Medicamento"
                              name="tipo_Medicamento"
                              value={data.tipo_Medicamento}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Selecione uma opção</option>
                              {tiposMedicamento.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                  {tipo}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-classe-farmacologica"
                            >
                              Classe Farmacológica
                            </label>
                            <select
                              className="form-control form-control-alternative"
                              id="input-classe-farmacologica"
                              name="classe_farmacologica"
                              value={data.classe_farmacologica}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Selecione uma opção</option>
                              {classesFarmacologicas.map((classe, index) => (
                                <option key={index} value={classe}>
                                  {classe}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="numeroDosagem"
                            >
                              Dosagem
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control form-control-alternative"
                                type="number"
                                id="numeroDosagem"
                                name="numeroDosagem"
                                value={data.dosage.numeroDosagem}
                                onChange={handleChange}
                                required
                              />
                              <select
                                className="form-control form-control-alternative ml-1"
                                name="unidadeDosagem"
                                value={data.dosage.unidadeDosagem}
                                onChange={handleChange}
                                required
                              >
                                <option>Selecione uma opção</option>
                                {unidadesDosagem.map((unidade, index) => (
                                  <option key={index} value={unidade.value}>
                                    {unidade.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-faixa-etaria"
                            >
                              Restrição de Uso por Faixa Etária
                            </label>
                            <select
                              className="form-control form-control-alternative"
                              id="input-faixa-etaria"
                              name="faixa_etaria"
                              value={data.faixa_etaria}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Selecione uma opção</option>
                              {faixasEtarias.map((faixa, index) => (
                                <option key={index} value={faixa}>
                                  {faixa}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="quantidadeEstoque"
                            >
                              Quantidade em Estoque
                            </label>
                            <div className="d-flex">
                              <input
                                className="form-control form-control-alternative"
                                type="number"
                                id="quantidadeEstoque"
                                name="quantidadeEstoque"
                                value={data.quantidade.quantidadeEstoque}
                                onChange={handleChange}
                                required
                              />
                              <select
                                className="form-control form-control-alternative ml-1"
                                name="unidadeEstoque"
                                value={data.quantidade.unidadeEstoque}
                                onChange={handleChange}
                                required
                              >
                                <option>Selecione uma opção</option>
                                {unidadesMedida.map((unidade, index) => (
                                  <option key={index} value={unidade.value}>
                                    {unidade.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Status
                            </label>
                            <select
                              className="form-control form-control-alternative"
                              id="input-status"
                              name="status"
                              value={data.status}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Selecione uma opção</option>
                              {opcoesStatus.map((opcao, index) => (
                                <option key={index} value={opcao}>
                                  {opcao}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-contraindicacoes"
                            >
                              Contraindicações
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-contraindicacoes"
                              type="textarea"
                              name="contraindicacoes"
                              value={data.contraindicacoes}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                      <h6 className="heading-small text-muted mb-4">
                        Informação do Lote
                      </h6>
                      <FormGroup>
                        <Container>
                          <div style={{ overflowX: "auto" }}>
                            <Table bordered>
                              <thead>
                                <tr style={{ textAlign: "center" }}>
                                  <th>Número do Lote</th>
                                  <th>Validade</th>
                                  <th>Quantidade</th>
                                  <th>Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lot.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <Input
                                        type="text"
                                        id={`numeroLote_${index}`}
                                        value={item.numero}
                                        onChange={(e) =>
                                          handleChangeLote(
                                            item.id,
                                            "numero",
                                            e.target.value
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <Input
                                        type="date"
                                        id={`validade_${index}`}
                                        value={item.validade}
                                        onChange={(e) =>
                                          handleChangeLote(
                                            item.id,
                                            "validade",
                                            e.target.value
                                          )
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <input
                                          className="form-control form-control-alternative"
                                          style={{ minWidth: "70px" }}
                                          type="number"
                                          id={`quantidade_${index}`}
                                          value={item.quantidade}
                                          onChange={(e) =>
                                            handleChangeLote(
                                              item.id,
                                              "quantidade",
                                              e.target.value
                                            )
                                          }
                                        />
                                        <select
                                          className="form-control form-control-alternative ml-1"
                                          style={{ minWidth: "150px" }}
                                          id={`unidade_${index}`}
                                          name="unidade"
                                          value={item.unidade}
                                          onChange={(e) =>
                                            handleChangeLote(
                                              item.id,
                                              "unidade",
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option>Selecione uma opção</option>
                                          {unidadesMedida.map(
                                            (unidade, index) => (
                                              <option
                                                key={index}
                                                value={unidade.value}
                                              >
                                                {unidade.label}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        style={buttonStyle}
                                        onClick={addRow}
                                      >
                                        <IoMdAddCircle
                                          color="green"
                                          size={25}
                                        />
                                      </Button>
                                      <Button
                                        style={buttonStyle}
                                        onClick={() => removeRow(item.id)}
                                      >
                                        <IoIosRemoveCircle
                                          color="red"
                                          size={25}
                                        />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </Container>
                      </FormGroup>
                    </div>
                    <div className="text-right">
                      <Button type="submit" color="default">
                        Adicionar
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        className="ml-2"
                        onClick={handleCanceled}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AuthenticatedLayout>
    </>
  );
};

export default New;
