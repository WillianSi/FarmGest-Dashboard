import React, { useState } from "react";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import isEqual from "lodash/isEqual";
import {
  Modal,
  Button,
  Form,
  Input,
  FormGroup,
  Table,
  Row,
  Col,
  Container,
  ModalBody,
} from "reactstrap";
import {
  IoMdAddCircle,
  IoIosRemoveCircle,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import {
  opcoesStatus,
  viasAdministracao,
  tiposMedicamento,
  classesFarmacologicas,
  unidadesDosagem,
  faixasEtarias,
  unidadesMedida,
} from "../filter/filters.js";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig.js";

const Editar = (props) => {
  const { medication } = props;
  const buttonStyle = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    padding: "0",
  };
  const [showLoteInfo, setShowLoteInfo] = useState(false);
  const [data, setData] = useState({
    nome: medication.dataMedications.nome || "",
    via_administracao: medication.dataMedications.via_administracao || "",
    tipo_Medicamento: medication.dataMedications.tipo_Medicamento || "",
    classe_farmacologica: medication.dataMedications.classe_farmacologica || "",
    faixa_etaria: medication.dataMedications.faixa_etaria || "",
    status: medication.dataMedications.status || "",
    contraindicacoes: medication.dataMedications.contraindicacoes || "",
    dosage: {
      numeroDosagem: medication.dataMedications.dosage.numeroDosagem || "",
      unidadeDosagem: medication.dataMedications.dosage.unidadeDosagem || "",
    },
    quantidade: {
      quantidadeEstoque:
        medication.dataMedications.quantidade.quantidadeEstoque || "",
      unidadeEstoque:
        medication.dataMedications.quantidade.unidadeEstoque || "",
    },
  });

  const [nextId, setNextId] = useState(2);
  const [lot, setLot] = useState(
    medication.lotMedications.map((lotMedication, index) => ({
      id: index + 1,
      numero: lotMedication.numero || "",
      validade: lotMedication.validade || "",
      quantidade: lotMedication.quantidade || "",
      unidade: lotMedication.unidade || "",
    }))
  );

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

  const handleChangeLote = (id, field, value) => {
    setLot((prevLot) =>
      prevLot.map((lot) => (lot.id === id ? { ...lot, [field]: value } : lot))
    );
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

  const sortedLot = lot
    .slice()
    .sort((a, b) => new Date(a.validade) - new Date(b.validade));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const medicationRef = doc(
        firestore,
        "inventoryMedications",
        medication.id
      );

      const updatedFields = {};
      if (!isEqual(medication.dataMedications, data)) {
        updatedFields.dataMedications = data;
      }
      if (!isEqual(medication.lotMedications, lot)) {
        updatedFields.lotMedications = lot;
      }
      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(medicationRef, updatedFields);
      }

      props.handleAlert("Medicação atualizada.", "success", "Sucesso:");
      props.toggle();
    } catch (error) {
      props.handleAlert("Erro ao atualizar medicação.", "danger", "Erro:");
      props.toggle();
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      className={"max-width-50vw"}
    >
      <AuthenticatedLayout>
        <div className="modal-header">
          <h2 className="modal-title text-black">{"Editar Informações"}</h2>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <h6 className="heading-small text-muted mb-4">
              Informação do Medicamento
            </h6>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-nome">
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
                  <label className="form-control-label" htmlFor="numeroDosagem">
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
                  <label className="form-control-label" htmlFor="input-status">
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
            <hr className="my-4" />
            <div
              onClick={() => setShowLoteInfo(!showLoteInfo)}
              style={{ cursor: "pointer" }}
            >
              <h6
                className={`heading-small text-muted mb-0 ${
                  showLoteInfo ? "text-primary" : "text-blue"
                }`}
              >
                Informação do Lote
                <span>&nbsp;</span>
                {showLoteInfo ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </h6>
            </div>
            <div style={{ marginBottom: "20px" }}></div>
            {showLoteInfo && (
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
                      {sortedLot.map((item, index) => (
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
                                style={{ minWidth: "70px"}}
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
                                style={{ minWidth: "150px"}}
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
                                {/* Suponho que você tenha um array chamado unidadesMedida */}
                                {unidadesMedida.map((unidade, index) => (
                                  <option key={index} value={unidade.value}>
                                    {unidade.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td>
                            <Button style={buttonStyle} onClick={addRow}>
                              <IoMdAddCircle color="green" size={25} />
                            </Button>
                            <Button
                              style={buttonStyle}
                              onClick={() => removeRow(item.id)}
                            >
                              <IoIosRemoveCircle color="red" size={25} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  </div>
                </Container>
              </FormGroup>
            )}
            <div className="text-right">
              <Button color="success">Salvar</Button>
              <Button color="danger" onClick={props.toggle}>
                Fechar
              </Button>
            </div>
          </Form>
        </ModalBody>
      </AuthenticatedLayout>
    </Modal>
  );
};

export default Editar;
