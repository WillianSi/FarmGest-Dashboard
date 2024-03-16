import React, { useState } from "react";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import { Modal, Button, Form, ModalHeader, ModalBody } from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loading from "../../components/Animation/loading.js";

const DataLot = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { medications, isOpen, toggle } = props;

  const clearFields = () => {
    setStartDate("");
    setEndDate("");
  };

  const handleToggle = () => {
    clearFields();
    toggle();
  };

  const handleLotPDF = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const doc = new jsPDF("landscape");
    const head = [
      [
        "Nome",
        "Classe Farmacológica",
        "Dosagem",
        "Faixa Etária",
        "Tipo de Medicamento",
        "Via de Administração",
        "Status",
        "Quantidade Estoque",
      ],
    ];

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    medications.forEach((medication) => {
      const tableData = [
        [
          medication.dataMedications.nome,
          medication.dataMedications.classe_farmacologica,
          `${medication.dataMedications.dosage.numeroDosagem}/${medication.dataMedications.dosage.unidadeDosagem}`,
          medication.dataMedications.faixa_etaria,
          medication.dataMedications.tipo_Medicamento,
          medication.dataMedications.via_administracao,
          medication.dataMedications.status,
          `${medication.dataMedications.quantidade.quantidadeEstoque} ${medication.dataMedications.quantidade.unidadeEstoque}`,
        ],
      ];

      doc.autoTableSetDefaults({
        theme: "grid",
      });

      doc.autoTable({
        head: head,
        body: tableData,
        styles: {
          valign: "middle",
          halign: "center",
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [169, 169, 169],
          textColor: [0, 0, 0],
        },
      });

      // Filtra e classifica os lotes com base na data de validade
      const filteredLotMedications = medication.lotMedications
        .map((lot) => ({
          ...lot,
          validade: new Date(lot.validade),
        }))
        .filter(
          (lot) => lot.validade >= startDateObj && lot.validade <= endDateObj
        )
        .sort((a, b) => a.validade - b.validade);

      const tableLot = filteredLotMedications.map((lot) => [
        lot.numero,
        lot.validade.toLocaleDateString("pt-BR"),
        `${lot.quantidade} ${lot.unidade}`,
      ]);

      doc.autoTable({
        head: [["Número do Lote", "Validade", "Quantidade"]],
        body: tableLot,
        startY: doc.autoTable.previous.finalY,
        styles: {
          valign: "middle",
          halign: "center",
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [169, 169, 169],
          textColor: [0, 0, 0],
        },
      });
    });

    doc.save("lista_de_medicamentos_por_lotes.pdf");
    clearFields();
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <AuthenticatedLayout>
        <ModalHeader toggle={handleToggle}>Selecionar data</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLotPDF}>
            <p>
              Selecione um período de tempo para gerar um relatório.
            </p>
            <div className="d-flex align-items-center mb-2 justify-content-center">
              <label htmlFor="dateInicial" className="mr-2">
                Data Inicial:
              </label>
              <input
                id="dateInicial"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control mr-2"
                style={{ width: "150px" }}
              />
            </div>
            <div className="d-flex align-items-center mb-3 justify-content-center">
              <label htmlFor="dateFinal" className="mr-3">
                Data Final:
              </label>
              <input
                id="dateFinal"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control mr-2"
                style={{ width: "150px" }}
              />
            </div>
            <div className="text-right">
              <Button type="submit" color="default" disabled={isLoading}>
                {isLoading ? <Loading /> : "Gerar PDF"}
              </Button>
              <Button color="danger" onClick={handleToggle}>
                Fechar
              </Button>
            </div>
          </Form>
        </ModalBody>
      </AuthenticatedLayout>
    </Modal>
  );
};

export default DataLot;
