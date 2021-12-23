import React, { useState } from "react";
import { Grid, GridItem, Center, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchStation } from "../../api";

const Detail = () => {
  const [station, setStation] = useState<IStation>();
  const location = useLocation<ILocationState>();

  // Queries
  const { isLoading } = useQuery<IStation, Error>(
    ["getStation", location.state.stationId],
    () => fetchStation({ id: location.state.stationId }),
    {
      onSuccess: (data) => {
        setStation(data);
      },
      onError: (error) => {
        console.log(`error`, error);
      },
    }
  );

  if (isLoading || !station) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Grid
      templateRows="repeat(8, 1fr)"
      templateColumns="repeat(6, 1fr)"
      bg="green.200"
      p={5}
      gap={4}
    >
      <GridItem colSpan={2} px={3}>
        Station Id
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {station.id}
      </GridItem>
      <GridItem colSpan={2} px={3}>
        Station Address
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {station.address}
      </GridItem>
      <GridItem colSpan={2} px={3}>
        Station Geometry
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {`[${station.latitude}, ${station.longitude}]`}
      </GridItem>
      <GridItem colSpan={2} px={3}>
        Station Provider
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {station.provider}
      </GridItem>
      <GridItem colSpan={2} px={3}>
        Quantity
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {station.quantity}
      </GridItem>
      <GridItem colSpan={2} px={3}>
        Is station available?
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {station.availability ? "Yes" : "No"}
      </GridItem>
      <GridItem colSpan={2} px={3}>
        Created At
      </GridItem>
      <GridItem colSpan={4} px={3}>
        {new Date(station.createdAt + "").toDateString()}
      </GridItem>
    </Grid>
  );
};

export default Detail;
