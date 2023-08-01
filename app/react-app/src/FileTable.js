import React from "react";
import Header from "./Header";
import FileTableList from "./FileTableList";
import { Box } from "@chakra-ui/react";

class FileTable extends React.Component {
  render() {
    return (
      <Box>
        <Header index={0} />
        <FileTableList />
      </Box>
    );
  }
}

export default FileTable;
