import AddButton from "../../General/Components/AddButton";
import { insertIndividual } from "./database";
import { capitalize } from "../../General/Utils/string";
import { update } from "../../General/Utils/database";

export const handleSetOptions = (
  db,
  navigation,
  year,
  month,
  day,
  plantId,
  place,
  setReload
) => {
  navigation.setOptions({
    headerRight: () => (
      <AddButton
        color="white"
        handlePress={() =>
          insertIndividual(db, year, month, day, plantId, place, setReload)
        }
        size={40}
        style={{ marginRight: 10 }}
      />
    ),
  });
};

export const handleUpdateName = (db, text, setName, plant) => {
  const capitalizedName = capitalize(text);
  setName(capitalizedName);
  if (text === "") {
    return;
  }
  plant.nombre = capitalizedName;
  update(db, "PLANTA", "nombre", capitalizedName, plant.id);
};

export const handleUpdatePlantAtribute = (
  db,
  plant,
  text,
  atribute,
  setValue
) => {
  plant[atribute] = text;
  setValue(text);
  update(db, "PLANTA", atribute, text, plant.id);
};

export const handleUpdateIndividualAtribute = (
  db,
  value,
  atribute,
  iId,
  total,
  setTotal,
  percentage,
  setPercentage
) => {
  if ([" ", ".", ",", "-"].some((e) => value.includes(e))) {
    return;
  }
  if (value === "" || value === null) {
    update(db, "INDIVIDUO", atribute, 0, iId);
    setTotal(total - percentage);
    setPercentage("");
    return;
  }
  let number = parseInt(value);
  const np = percentage === "" ? 0 : parseInt(percentage);
  if (number > 100 - total + np) {
    number = 100 - total + np;
  }
  setTotal(total - percentage + number);
  setPercentage(number.toString());
  update(db, "INDIVIDUO", atribute, number, iId);
};

export const handleUpdateIndividualObservations = (
  db,
  iId,
  text,
  setObservations
) => {
  setObservations(text);
  update(db, "INDIVIDUO", "observaciones", text, iId);
};
