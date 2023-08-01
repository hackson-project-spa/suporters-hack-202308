import TabMain from "./TabMain";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import React from "react";

class Tab extends React.Component {
  render() {
    return (
      <Box>
        <Header index={2} />
        <TabMain />
      </Box>
    );
  }
}

export default Tab;
