import React from "react";
import { Tab, Tabs, TabList, Text, HStack, Link } from "@chakra-ui/react";

class Heder extends React.Component {
  render() {
    return (
      <Tabs colorScheme="red">
        <TabList>
          <HStack>
            <Text rm="20px" p={"4"}>
              logo
            </Text>

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
    );
  }
}
export default Heder;
