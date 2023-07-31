import React from "react";
import Header from "./Header";
import HomeMain from "./HomeMain";
import { Box } from "@chakra-ui/react";

class Home extends React.Component {
  render() {
    return (
      <Box>
        <Header />
        <HomeMain />
      </Box>
    );
  }
}

export default Home;
