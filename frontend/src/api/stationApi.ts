import { encodeQueryData } from "utils/helpers";
import { apiEndpoints } from "utils/config";

// get a single station
export const fetchStation = async (data: { id: number | undefined }) => {
  if (!data.id) return;
  const queryString = encodeQueryData(data);
  const response = await fetch(`${apiEndpoints.station}?${queryString}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

// get all stations
export const fetchStations = async () => {
  const response = await fetch(apiEndpoints.station);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// add a new station
export const postStation = async (data: IStation) => {
  const response = await fetch(apiEndpoints.station, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// update existing station
export const updateStation = async (data: IStation) => {
  const { id, ...rest } = data;
  if (!id) return;
  await fetch(`${apiEndpoints.station}?id=${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });
};

// delete a station
export const deleteStation = async (id: number | undefined) => {
  if (!id) return;
  await fetch(`${apiEndpoints.station}?id=${id}`, {
    method: "DELETE",
  });
};
