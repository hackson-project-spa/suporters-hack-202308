import React from "react";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import FileRegisterForm from "./FileRegisterForm";

class FileRegister extends React.Component {
  render() {
    return (
      <Box>
        <Header />
        <FileRegisterForm />
        {/* <></> */}
      </Box>
    );
  }
}

export default FileRegister;
