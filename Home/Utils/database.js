import defaultImage from "../../assets/default.png";
import { filterString } from "../../General/Utils/string";

export async function getPlaces(db, setPlaces) {
  try {
    const places = await db.getAllAsync("SELECT * FROM LUGAR ORDER BY nombre");
    setPlaces([
      ...places.map((place) => ({
        label: place.nombre,
        value: place.id,
        filter: filterString(place.nombre),
      })),
      { label: "Nuevo Lugar", value: 0, filter: "nuevo lugar" },
    ]);
  } catch (error) {
    setPlaces([{ label: "Nuevo Lugar", value: 0, filter: "nuevo lugar" }]);
  }
}

export async function getPlants(db, setPlants) {
  try {
    const plants = await db.getAllAsync("SELECT * FROM PLANTA ORDER BY nombre");
    setPlants(
      plants.map((plant) => ({ ...plant, filter: filterString(plant.nombre) }))
    );
  } catch (error) {
    setPlants([]);
  }
}

export async function getPhotos(db, idPlant, setPhotos) {
  const photos = await db.getAllAsync(
    "SELECT * FROM FOTO WHERE idPlanta = ? ORDER BY id DESC",
    [idPlant]
  );
  setPhotos([...photos, defaultImage]);
}

export async function insertElements(db, values, query) {
  for (const value of values) {
    await db.runAsync(query, [value]);
  }
}
