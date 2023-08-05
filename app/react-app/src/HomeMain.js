import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Text,
  HStack,
  SimpleGrid,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

function HomeMain() {
  const buttonName = [
    {
      name: "ファイル検索",
      path: "/index",
      color: "",
    },
    {
      name: "ファイル登録",
      path: "/register",
    },
    {
      name: "タグ登録",
      path: "/tag",
    },
  ];
  return (
    <Box>
      <Box p={20} bg={"##ff0000"}>
        <Center>
          <Text fontSize="xl">タイトルロゴ</Text>
        </Center>
      </Box>
      <Box p={20}>
        <Center>
          <Text fontSize="xl">概要</Text>
        </Center>
      </Box>
      <Box p={20}>
        <Center>
          <SimpleGrid spacing={4} templeateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            <HStack spacing={"50px"}>
              {buttonName.map((button) => (
                <Card>
                  <CardHeader>
                    <Heading size="md"> {button.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                  </CardBody>
                  <CardFooter>
                    <LinkRouter to={button.path}>
                      <Button>{button.name}</Button>
                    </LinkRouter>
                  </CardFooter>
                </Card>
              ))}
            </HStack>
          </SimpleGrid>
        </Center>
      </Box>
    </Box>
  );
}

export default HomeMain;
