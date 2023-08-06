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
  Image,
  Stack,
} from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import logo from "./logo.png";
import folder from "./folder.jpg";
import document from "./document.png";
import tag_file from "./tag.jpg";

function HomeMain() {
  const buttonName = [
    {
      name: "ファイル検索",
      path: "/index",
      img: folder,
      color: "",
      explain: "ファイルの検索を行います",
    },
    {
      name: "ファイル登録",
      path: "/register",
      img: document,
      color: "",
      explain: "ファイルの登録を行います",
    },
    {
      name: "タグ登録",
      path: "/tag",
      img: tag_file,
      color: "",
      explain: "タグの登録を行います",
    },
  ];
  return (
    // 後ろの画像だけ透明度を下げたい
    <Box bgImage={logo} bgSize="cover" bgPosition="center">
      {/* Textの背景をfirebaseの画像にしたい */}
      <Box pt="5vh">
        <Center>
          {/* 太字で書く */}
          <Text fontSize="50px" fontWeight="bold">
            Tagify
          </Text>
        </Center>
      </Box>
      <Box p="5vh">
        <Center>
          <Stack>
            <Text fontSize="xl" fontWeight="bold">
              Tagifyは、ファイルやコンテンツの整理と検索を簡単にするための便利なツールです。
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              ユーザーはファイルにタグを付けることで、関連するコンテンツを簡単に分類し、タグを使った効率的な検索を行うことができます。
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              タグはユーザーが自由に設定でき、カテゴリーやキーワードに応じてタグを付与することが可能です。
            </Text>
          </Stack>
        </Center>
      </Box>
      <Box p="5vh">
        <Center>
          <SimpleGrid spacing={4} templeateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            <HStack spacing={"5vw"}>
              {buttonName.map((button) => (
                <Card key={button.name} maxW="sm" borderRadius="lg" overflow="hidden" w={"20vw"}>
                  {/* <CardHeader>
                    <Heading size="md"> {button.name}</Heading>
                  </CardHeader> */}
                  <CardBody>
                    <Heading size="md" mb="2">
                      {button.name}
                    </Heading>
                    {/* 各画像の大きさが統一されるようにする */}
                    <Image src={button.img} borderRadius="lg" boxSize="15vw" />
                    <Text mt="3">{button.explain}</Text>
                  </CardBody>
                  <CardFooter>
                    <LinkRouter to={button.path}>
                      {/* ボタンの色を変えたい */}
                      <Button colorScheme="twitter">{button.name}</Button>
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
