import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

import "./NavBar.css";

const NavBar = () => {
  return (
    <Flex p={10}>
      <Box>
        <Link to="/home">Home</Link>
      </Box>
      <Spacer />
      <Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Flex>
  );
};

export default NavBar;
