import React from "react";
import { Input } from "reactstrap";

export const opcoesStatus = ["Disponível", "Estoque Baixo", "Indisponível"];

export const classesFarmacologicas = [
  "Analgésicos",
  "Antibióticos",
  "Antidepressivos",
  "Anti-hipertensivos",
  "Anti-inflamatórios",
  "Antipsicóticos",
  "Antivirais",
  "Broncodilatadores",
  "Diuréticos",
  "Hipoglicemiantes",
  "Outros",
];

export const faixasEtarias = [
  "0-2 anos",
  "13-18 anos",
  "19-30 anos",
  "3-5 anos",
  "31-50 anos",
  "51-70 anos",
  "6-12 anos",
  "Acima de 70 anos",
  "Adulto",
  "Adulto e Pediátrico",
  "Pediátrico",
  "Outros",
  "Não possui",
];

export const tiposMedicamento = [
  "Adesivo transdérmico",
  "Aerosol",
  "Cápsula",
  "Colírio",
  "Comprimido",
  "Creme",
  "Emplasto",
  "Gel",
  "Gotas otológicas",
  "Loção",
  "Pílula",
  "Pomada",
  "Pó para reconstituição",
  "Sachê",
  "Solução oral",
  "Spray nasal",
  "Suspensão oral",
  "Supositório",
  "Xarope",
  "Outros",
];

export const unidadesDosagem = [
  { value: "ampolas", label: "Ampolas" },
  { value: "aplicações", label: "Aplicações" },
  { value: "comprimidos", label: "Comprimidos" },
  { value: "cápsulas", label: "Cápsulas" },
  { value: "g", label: "g (Gramas)" },
  { value: "gts", label: "gts (Gotas)" },
  { value: "L", label: "L (Litros)" },
  { value: "mcg", label: "mcg (Microgramas)" },
  { value: "mg", label: "mg (Miligramas)" },
  { value: "ml", label: "ml (Mililitros)" },
  { value: "puffs", label: "Puffs" },
  { value: "pulverizações", label: "Pulverizações" },
  { value: "%", label: "%" },
  { value: "outros", label: "Outros" },
  { value: "Não possui", label: "Não possui" }
];

export const unidadesMedida = [
  { value: "cartelas", label: "Cartelas" },
  { value: "caixas", label: "Caixas" },
  { value: "fr", label: "Frascos (fr)" },
  { value: "g", label: "Grama (g)" },
  { value: "kg", label: "Quilograma (kg)" },
  { value: "l", label: "Litro (l)" },
  { value: "ml", label: "Mililitro (ml)" },
  { value: "unidade", label: "Unidade" },
  { value: "outros", label: "Outros" },
];

export const viasAdministracao = [
  "Inalatória",
  "Intradérmica",
  "Intramuscular",
  "Intranasal",
  "Intravenosa",
  "Intravenosa central",
  "Intravenosa periférica",
  "Oral",
  "Retal",
  "Subcutânea",
  "Sublingual",
  "Transdérmica",
  "Outros",
];

export const FilterSearchBar = ({ value, onChange }) => {
  return (
    <div className="p-2" style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#ffffff" }}>
      <Input
        type="text"
        id="input-filter"
        placeholder="Pesquisar ..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
