import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";
import {
  FilterSearchBar,
  opcoesStatus,
  viasAdministracao,
  tiposMedicamento,
  classesFarmacologicas,
  unidadesDosagem,
  faixasEtarias,
  unidadesMedida,
} from "./filters.js";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const FilterButton = ({ setFilters, filters }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setSearchValue("");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleFilterSelect = (filter) => {
    if (filter === "todos") {
      setFilters({
        status: [],
        classeFarmacologica: [],
        viaAdministracao: [],
        tipoMedicamento: [],
        unidadeDosagem: [],
        faixaEtaria: [],
        unidadeMedida: [],
      });
    } else {
      if (filters[filter.type].includes(filter.value)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filter.type]: prevFilters[filter.type].filter(
            (value) => value !== filter.value
          ),
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filter.type]: [filter.value],
        }));
      }
    }
  };

  return (
    <>
      <AuthenticatedLayout>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav onClick={toggleDropdown}>
            <span className="btn btn-info">
              <FaFilter />
            </span>
          </DropdownToggle>
          <DropdownMenu
            right
            className="custom-dropdown-menu"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            <FilterSearchBar
              value={searchValue}
              onChange={handleSearchChange}
            />
            {(!searchValue ||
              !classesFarmacologicas.some((item) =>
                item.toLowerCase().includes(searchValue)
              )) && (
              <DropdownItem onClick={() => handleFilterSelect("todos")}>
                Todos
              </DropdownItem>
            )}
            {classesFarmacologicas.some((item) =>
              item.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Classes Farmacológicas
                </DropdownItem>
                {classesFarmacologicas
                  .filter((item) => item.toLowerCase().includes(searchValue))
                  .map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() =>
                        handleFilterSelect({
                          type: "classeFarmacologica",
                          value: item,
                        })
                      }
                    >
                      {item}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
            {opcoesStatus.some((item) =>
              item.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Status
                </DropdownItem>
                {opcoesStatus
                  .filter((item) => item.toLowerCase().includes(searchValue))
                  .map((status) => (
                    <DropdownItem
                      key={status}
                      onClick={() =>
                        handleFilterSelect({ type: "status", value: status })
                      }
                    >
                      {status}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
            {viasAdministracao.some((item) =>
              item.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Vias de Administração
                </DropdownItem>
                {viasAdministracao
                  .filter((item) => item.toLowerCase().includes(searchValue))
                  .map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() =>
                        handleFilterSelect({
                          type: "viaAdministracao",
                          value: item,
                        })
                      }
                    >
                      {item}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
            {tiposMedicamento.some((item) =>
              item.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Tipos de Medicamento
                </DropdownItem>
                {tiposMedicamento
                  .filter((item) => item.toLowerCase().includes(searchValue))
                  .map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() =>
                        handleFilterSelect({
                          type: "tipoMedicamento",
                          value: item,
                        })
                      }
                    >
                      {item}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
            {unidadesDosagem.some((item) =>
              item.label.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Unidades de Dosagem
                </DropdownItem>
                {unidadesDosagem
                  .filter((item) =>
                    item.label.toLowerCase().includes(searchValue)
                  )
                  .map((item) => (
                    <DropdownItem
                      key={item.value}
                      onClick={() =>
                        handleFilterSelect({
                          type: "unidadeDosagem",
                          value: item,
                        })
                      }
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
            {faixasEtarias.some((item) =>
              item.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Faixas Etárias
                </DropdownItem>
                {faixasEtarias
                  .filter((item) => item.toLowerCase().includes(searchValue))
                  .map((item) => (
                    <DropdownItem
                      key={item}
                      onClick={() =>
                        handleFilterSelect({
                          type: "faixaEtaria",
                          value: item,
                        })
                      }
                    >
                      {item}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
            {unidadesMedida.some((item) =>
              item.label.toLowerCase().includes(searchValue)
            ) && (
              <>
                <DropdownItem header className="text-info">
                  Unidades de Medida
                </DropdownItem>
                {unidadesMedida
                  .filter((item) =>
                    item.label.toLowerCase().includes(searchValue)
                  )
                  .map((item) => (
                    <DropdownItem
                      key={item.value}
                      onClick={() =>
                        handleFilterSelect({
                          type: "unidadeMedida",
                          value: item,
                        })
                      }
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                <DropdownItem divider />
              </>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </AuthenticatedLayout>
    </>
  );
};

export default FilterButton;
