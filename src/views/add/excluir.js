import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import { Modal, Button } from "reactstrap";
import { firestore } from "../../services/firebaseConfig.js";
import { deleteDoc, doc } from "firebase/firestore";

const Excluir = (props) => {
  const [medicationName, setMedicationName] = useState("");

  useEffect(() => {
    setMedicationName(props.medicationToDelete);
  }, [props.medicationToDelete]);

  const handleExcluir = async () => {
    if (props.nomeId) {
      try {
        const medicationRef = doc(
          firestore,
          "inventoryMedications",
          props.nomeId
        );
        deleteDoc(medicationRef);
        props.handleAlert(
          "Medicamento excluído com sucesso",
          "success",
          "Sucesso!"
        );
        props.toggle();
      } catch (error) {
        props.handleAlert("Erro ao excluir medicamento", "danger", "Erro!");
        props.toggle();
      }
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
    >
      <AuthenticatedLayout>
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={props.toggle}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            <h4 className="heading mt-4">
              Você tem certeza que quer excluir o medicamento{" "}
              <strong>{medicationName}</strong>?
            </h4>
            <p>
              Se você excluir, não poderá recuperar os dados do medicamento.
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="btn-white"
            color="default"
            type="button"
            onClick={handleExcluir}
          >
            Sim
          </Button>
          <Button
            className="btn-white ml-auto"
            color="default"
            data-dismiss="modal"
            type="button"
            onClick={props.toggle}
          >
            Não
          </Button>
        </div>
      </AuthenticatedLayout>
    </Modal>
  );
};

export default Excluir;