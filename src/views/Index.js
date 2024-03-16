import React, { useEffect, useMemo, useRef, useState } from "react";
import FilterButton from "./filter/filterButton.js";
import {
  Form,
  FormGroup,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Alert,
  Button,
} from "reactstrap";

import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import useAlert from "../hooks/useAlert.js";
import Excluir from "./add/excluir.js";
import Editar from "./add/editar.js";

import Header from "components/Headers/Header.js";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FiEdit } from "react-icons/fi";
import { MdFilterAltOff } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { firestore } from "../services/firebaseConfig.js";
import { opcoesStatus } from "./filter/filters.js";

import GeneratePDFButton from "./add/generatePDF.js";
import Loading from "../components/Animation/table.js";

const Index = () => {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [excluirModalOpen, setExcluirModalOpen] = useState(false);
  const [editarModalOpen, setEditarModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [medicationToDelete, setMedicationToDelete] = useState(null);

  const unsubscribeRef = useRef(null);

  const buttonStyle = {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    padding: "0",
  };

  const { errorMessage, alertColor, alertTitle, showAlert, handleAlert } =
    useAlert();
  const [filters, setFilters] = useState({
    status: '',
    classeFarmacologica: '',
    viaAdministracao: '',
    tipoMedicamento: '',
    unidadeDosagem: '',
    faixaEtaria: '',
    unidadeMedida: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    const fetchEntireCollection = async () => {
      try {
        const inventoryRef = collection(firestore, "inventoryMedications");
        unsubscribeRef.current = onSnapshot(inventoryRef, (snapshot) => {
          const allDocs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          //Ordena o array de medicamentos em ordem alfabética
          const sortedMeds = allDocs.sort((a, b) => a.dataMedications.nome.localeCompare(b.dataMedications.nome));
          setMedications(sortedMeds);
        });
      } catch (error) {
        handleAlert(
          "Erro ao buscar medicamentos no banco de dados.",
          "danger",
          "Erro:"
        );
      }
    };
    fetchEntireCollection();
    return () => {
      if (
        unsubscribeRef.current &&
        typeof unsubscribeRef.current === "function"
      ) {
        unsubscribeRef.current();
      }
    };
  }, [setMedications]);

  const filteredMedications = useMemo(() => {
    let filtered = medications.filter((medication) =>
      medication.dataMedications.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    if (filters.status.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.status.includes(medication.dataMedications.status)
      );
    }
    if (filters.classeFarmacologica.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.classeFarmacologica.includes(
          medication.dataMedications.classe_farmacologica
        )
      );
    }
    if (filters.viaAdministracao.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.viaAdministracao.includes(
          medication.dataMedications.via_administracao
        )
      );
    }
    if (filters.tipoMedicamento.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.tipoMedicamento.includes(
          medication.dataMedications.tipo_Medicamento
        )
      );
    }
    if (filters.unidadeDosagem.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.unidadeDosagem.some((unit) =>
          unit.value.includes(medication.dataMedications.dosage.unidadeDosagem)
        )
      );
    }
    if (filters.faixaEtaria.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.faixaEtaria.includes(medication.dataMedications.faixa_etaria)
      );
    }
    if (filters.unidadeMedida.length > 0) {
      filtered = filtered.filter((medication) =>
        filters.unidadeMedida.some((unit) =>
          unit.value.includes(
            medication.dataMedications.quantidade.unidadeEstoque
          )
        )
      );
    }
    if (filters.dateRange.startDate.length > 0 && filters.dateRange.endDate.length > 0) {
      filtered = filtered.filter((medication) => {
        const validLots = medication.lotMedications.filter((lot) => {
          const lotDate = new Date(lot.validade);
          const startDate = new Date(filters.dateRange.startDate);
          const endDate = new Date(filters.dateRange.endDate);
          return lotDate >= startDate && lotDate <= endDate;
        });
        return validLots.length > 0;
      });
    }
    return filtered;
  }, [medications, searchTerm, filters]);

  const handleStatusChange = async (medicationId, newStatus) => {
    try {
      const medicationRef = doc(
        firestore,
        "inventoryMedications",
        medicationId
      );
      await updateDoc(medicationRef, {
        "dataMedications.status": newStatus,
      });
    } catch (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleAlert(
        "Erro ao atualizar o status do medicamento.",
        "danger",
        "Erro:"
      );
    }
  };

  const toggleExcluirModal = (medicationId, medicationNome) => {
    setExcluirModalOpen(!excluirModalOpen);
    setSelectedId(medicationId);
    setMedicationToDelete(medicationNome);
  };

  const [selectedMedication, setSelectedMedication] = useState(null);
  const toggleEditarModal = (medicationId) => {
    const selectedMedication = filteredMedications.find(
      (medication) => medication.id === medicationId
    );
    setEditarModalOpen(!editarModalOpen);
    setSelectedMedication(selectedMedication);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      classeFarmacologica: '',
      viaAdministracao: '',
      tipoMedicamento: '',
      unidadeDosagem: '',
      faixaEtaria: '',
      unidadeMedida: '',
      dateRange: {
        startDate: '',
        endDate: '',
      },
    });
  };

  return (
    <>
      <AuthenticatedLayout>
        <Header />
        <Container className="mt--7" fluid>
          <div>
            <GeneratePDFButton medications={medications} />
          </div>
          <Row>
            <div className="col">
              <Card className="shadow">
                <div className="floating-alert">
                  {showAlert && (
                    <Alert color={alertColor}>
                      <strong>{alertTitle}</strong> {errorMessage}
                    </Alert>
                  )}
                </div>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <Form className="w-75">
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText
                            style={{
                              backgroundColor: "#11cdef",
                              borderColor: "#11cdef",
                            }}
                          >
                            <i
                              className="fas fa-search"
                              style={{ color: "white" }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="searchTerm"
                          name="searchTerm"
                          style={{ borderColor: "#11cdef", color: "black" }}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Pesquisar medicamento..."
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "5px" }}>
                      <FilterButton setFilters={setFilters} filters={filters} />
                    </div>
                    <Button
                      className="btn btn-warning"
                      onClick={handleClearFilters}
                    >
                      <MdFilterAltOff size={19} />
                    </Button>
                  </div>
                </CardHeader>
                <Table
                  className="align-items-center text-center table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Medicamento</th>
                      <th scope="col">Classe</th>
                      <th scope="col">Dosagem</th>
                      <th scope="col">Status</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <div style={{ display: "inline-block" }}>
                            <Loading />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredMedications.map((medication, index) => (
                        <tr key={medication.id}>
                          <td>{medication.dataMedications.nome}</td>
                          <td>
                            {medication.dataMedications.classe_farmacologica}
                          </td>
                          <td>
                            {medication.dataMedications.dosage.numeroDosagem}/
                            {medication.dataMedications.dosage.unidadeDosagem}
                          </td>
                          <td className="align-middle">
                            <div className="d-flex justify-content-center">
                              <select
                                id={`statusSelect_${index}`}
                                className={`form-control form-control-sm form-control-alternative ${
                                  medication.dataMedications.status ===
                                  "Disponível"
                                    ? "text-success"
                                    : medication.dataMedications.status ===
                                      "Indisponível"
                                    ? "text-danger"
                                    : "text-yellow"
                                }`}
                                style={{ width: "130px", textAlign: "center" }}
                                value={medication.dataMedications.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    medication.id,
                                    e.target.value
                                  )
                                }
                              >
                                {opcoesStatus.map((opcao, index) => (
                                  <option
                                    key={index}
                                    value={opcao}
                                    className="text-black"
                                  >
                                    {opcao}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td>
                            <Button
                              style={buttonStyle}
                              onClick={() => toggleEditarModal(medication.id)}
                            >
                              <FiEdit color="green" size={20} />
                            </Button>
                            <Button
                              style={buttonStyle}
                              onClick={() =>
                                toggleExcluirModal(
                                  medication.id,
                                  medication.dataMedications.nome
                                )
                              }
                            >
                              <TiDeleteOutline color="red" size={25} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
        {selectedMedication && (
          <Editar
            isOpen={editarModalOpen}
            toggle={toggleEditarModal}
            handleAlert={handleAlert}
            medication={selectedMedication}
          />
        )}
        <Excluir
          isOpen={excluirModalOpen}
          toggle={toggleExcluirModal}
          nomeId={selectedId}
          medicationToDelete={medicationToDelete}
          handleAlert={handleAlert}
        />
      </AuthenticatedLayout>
    </>
  );
};

export default Index;
