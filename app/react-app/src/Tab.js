import TabMain from "./TabMain";
import Header from "./Header";
import { Box } from "@chakra-ui/react";

class Tab extends React.Component {
  render() {
    return (
      <Box>
        <Header />
        <TabMain />
      </Box>
    );
  }
}

export default Tab;
