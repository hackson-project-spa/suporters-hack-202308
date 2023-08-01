import React from "react";
import { Box, Button, Center, HStack, Textarea, VStack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

function FileRegisterForm() {
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
            アブストラクト
          </FormLabel>
          <Textarea type="abs" w="500px" placeholder="Basic usage" size="lg" mb={4} />
          <FormLabel mt={1} htmlFor="name">
            タグ
          </FormLabel>
          <HStack>
            <Box bg={"#E2E8F0"} p={4} rounded="base">
              <Text fontSize="lg">tab_name</Text>
            </Box>
            <Button size="lg" mb={4}>
              選択
            </Button>
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
