import React from "react";
import { Tab, Tabs, TabList, Text, HStack } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

function Header(index) {
  const tabList = [
    {
      id: 1,
      name: "ファイル検索",
      path: "/index",
    },
    {
      id: 2,
      name: "ファイル登録",
      path: "/register",
    },
    {
      id: 3,
      name: "タグ登録",
      path: "/tag",
    },
  ];
  return (
    <Tabs colorScheme="red" index={index.index} defaultIndex={-1} backgroundColor={"#edf6fa"}>
      <TabList>
        <HStack>
          <LinkRouter to="/">
            <Text rm="20px" p={"4"} mr={6}>
              logo
            </Text>
          </LinkRouter>
          {tabList.map((tab) => (
            <LinkRouter to={tab.path} key={tab.id}>
              <Tab p={"4"}>{tab.name}</Tab>
            </LinkRouter>
          ))}
        </HStack>
      </TabList>
    </Tabs>
  );
}

export default Header;
