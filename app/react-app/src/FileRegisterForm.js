import React from "react";
import { Box, Button, Center, HStack, Textarea, VStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
} from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import DefineTags from "./DefineTags";

function FileRegisterForm() {
  const tags = [
    { key: 1, name: "tag1" },
    { key: 2, name: "tag2" },
    { key: 3, name: "tag3" },
    { key: 4, name: "tag4" },
  ];
  return (
    <VStack>
      <Box w="50vw" border="1px solid #00ffff" p={4} mt={4}>
        <FormControl>
          <FormLabel mt={1} htmlFor="name">
            ファイル名
          </FormLabel>
          <Input id="name" w="500px" placeholder="Basic usage" size="lg" mb={4} />
          <FormLabel mt={1} htmlFor="name">
            ファイル場所
          </FormLabel>
          <Input id="dir" w="500px" placeholder="Basic usage" size="lg" mb={4} />
          <FormLabel mt={1} htmlFor="name">
            概要
          </FormLabel>
          <Textarea type="abs" w="500px" placeholder="Basic usage" size="lg" mb={4} />
          <FormLabel mt={1} htmlFor="name">
            タグ
          </FormLabel>
          <HStack>
            {/* <Box bg={"#E2E8F0"} p={4} rounded="base">
              <Text fontSize="lg">tab_name</Text>
            </Box> */}
            {/* 枠線をつけて、タグを表示する 枠線の色はinputと同じ、やや太い枠*/}
            <HStack width={"35vw"} border="1px solid #CBD5E0" borderRadius="md" p={3}>
              {tags.map((tag) => (
                <Tag key={tag.key} size="sm" borderRadius="full" variant="solid" colorScheme="green">
                  <TagLabel>{tag.name}</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
            </HStack>
            <Popover placement="top">
              <PopoverTrigger>
                <Button size="lg" mb={4}>
                  選択
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>タグを選択</PopoverHeader>
                <PopoverBody>
                  <DefineTags />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </FormControl>
        <Center p={4}>
          <HStack spacing={4}>
            <Button size="lg" mb={4}>
              キャンセル
            </Button>
            <LinkRouter to="/index">
              <Button size="lg" mb={4}>
                登録
              </Button>
            </LinkRouter>
            <Button size="lg" mb={4}>
              続けて登録
            </Button>
          </HStack>
        </Center>
      </Box>
    </VStack>
  );
}

export default FileRegisterForm;
