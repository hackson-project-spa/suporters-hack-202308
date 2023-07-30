import React from "react";
import { Tab, Tabs, TabList, Text, HStack, Link } from "@chakra-ui/react";
import img from "./Date.png";

class Heder extends React.Component {
  render() {
    return (
      <HStack spacing="20px">
        <Tabs colorScheme="red">
          <TabList variant="unstyled">
            <HStack spacing="24px">
              <Text>a</Text>

              <Link href="https://github.com/hackson-project-spa/proctice-hack-2/blob/devel/app/react-app/src/App.js">
                <Tab>ホーム</Tab>
              </Link>
              <Link href="https://github.com/hackson-project-spa/proctice-hack-2/blob/devel/app/react-app/src/App.js">
                <Tab>ホーム</Tab>
              </Link>
              <Link href="https://github.com/hackson-project-spa/proctice-hack-2/blob/devel/app/react-app/src/App.js">
                <Tab>ホーム</Tab>
              </Link>
            </HStack>
          </TabList>
        </Tabs>
      </HStack>
    );
  }
}
export default Heder;
