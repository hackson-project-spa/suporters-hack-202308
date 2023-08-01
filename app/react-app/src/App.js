import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Tab from "./Tab";
import FileRegister from "./FileRegister";
import FileTable from "./FileTable";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tag" element={<Tab />} />
        <Route path="/index" element={<FileTable />} />
        <Route path="/register" element={<FileRegister />} />
      </Routes>
    </Box>
  );
}
export default App;
