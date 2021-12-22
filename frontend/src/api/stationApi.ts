import { encodeQueryData } from "utils/helpers";
import { apiEndpoints } from "utils/config";

// get a single station
export const fetchStation = async (data: { id: number | undefined }) => {
  if (!data.id) return;
  const queryString = encodeQueryData(data);
  const response = await fetch(`${apiEndpoints.station}/?${queryString}`);
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
export const postStation = async (data: any) => {
  let station = { ...data };
  if (data.latitude && data.longitude) {
    const geometry = `(${data.latitude}, ${data.longitude})`;
    delete data.latitude;
    delete data.longitude;
    station = {
      ...data,
      geometry,
    };
  }
  const response = await fetch(apiEndpoints.station, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(station),
  });
  return await response.json();
};

// update existing station
export const updateStation = async (data: any) => {
  const { id, ...rest } = data;
  let update = { ...rest };
  if (rest.latitude && rest.longitude) {
    const geometry = `(${rest.latitude}, ${rest.longitude})`;
    delete rest.latitude;
    delete rest.longitude;
    update = {
      ...rest,
      geometry,
    };
  }
  if (!id) return;
  await fetch(`${apiEndpoints.station}/?id=${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  });
};

// delete a station
export const deleteStation = async (id: number | undefined) => {
  if (!id) return;
  await fetch(`${apiEndpoints.station}/?id=${id}`, {
    method: "DELETE",
  });
};
