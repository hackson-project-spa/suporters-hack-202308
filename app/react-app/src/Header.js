import React from "react";
import { Tab, Tabs, TabList, Text, HStack, Image } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import Logo from "./logo-no-back.png";
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
    <Tabs colorScheme="red" index={index.index} defaultIndex={-1} backgroundColor={"#CBD5E0"}>
      <TabList>
        <HStack>
          <LinkRouter to="/">
            <Image src={Logo} objectFit="cover" boxSize="50px" />
          </LinkRouter>
          {tabList.map((tab) => (
            <LinkRouter to={tab.path} key={tab.id}>
              <Tab p={"4"} _hover={{ color: "teal" }}>
                {tab.name}
              </Tab>
            </LinkRouter>
          ))}
        </HStack>
      </TabList>
    </Tabs>
  );
}

export default Header;
