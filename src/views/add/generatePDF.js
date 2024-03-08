import React, { useState } from "react";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import { Button } from "reactstrap";
import DataLot from "./dataLot.js";
import jsPDF from "jspdf";

const GeneratePDFButton = ({ medications }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleMedPDF = () => {
    const doc = new jsPDF("landscape");
    const sortedMedications = medications.sort((a, b) =>
      a.dataMedications.nome.localeCompare(b.dataMedications.nome)
    );

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

    const tableData = sortedMedications.map((medication) => [
      medication.dataMedications.nome,
      medication.dataMedications.classe_farmacologica,
      `${medication.dataMedications.dosage.numeroDosagem}/${medication.dataMedications.dosage.unidadeDosagem}`,
      medication.dataMedications.faixa_etaria,
      medication.dataMedications.tipo_Medicamento,
      medication.dataMedications.via_administracao,
      medication.dataMedications.status,
      `${medication.dataMedications.quantidade.quantidadeEstoque} ${medication.dataMedications.quantidade.unidadeEstoque}`,
    ]);

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

    doc.save("lista_de_medicamentos.pdf");
  };

  return (
    <>
      <AuthenticatedLayout>
        <div style={{ marginLeft: "10px" }}>
          <Button
            onClick={handleMedPDF}
            className="btn"
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              background: "white",
            }}
          >
            Med. PDF
          </Button>
          <Button
            onClick={toggleModal}
            className="btn"
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              background: "white",
            }}
          >
            Lot. PDF
          </Button>
          {modalOpen && (
            <DataLot
              isOpen={modalOpen}
              medications={medications}
              toggle={toggleModal}
            />
          )}
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default GeneratePDFButton;
