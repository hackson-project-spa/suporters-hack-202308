import React from "react";
import { Box, Flex, Center, Text, HStack, Link } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

class HomeMain extends React.Component {
  render() {
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
            <Flex>
              <HStack spacing={"50px"}>
                <LinkRouter to="/tag">
                  <Box bg={"teal"} p={10} rounded="base">
                    <Text fontSize="xl" color={"white"}>
                      タグ登録
                    </Text>
                  </Box>
                </LinkRouter>
                <Link href="https://github.com/hackson-project-spa/proctice-hack-2/blob/devel/app/react-app/src/App.js">
                  <Box bg={"teal"} p={10} rounded="base">
                    <Text fontSize="xl" color={"white"}>
                      ボタン
                    </Text>
                  </Box>
                </Link>

                <Box
                  as="a"
                  bg={"teal"}
                  p={10}
                  rounded="base"
                  href="https://github.com/hackson-project-spa/proctice-hack-2/blob/devel/app/react-app/src/App.js"
                >
                  <Text fontSize="xl" color={"white"}>
                    ボタン
                  </Text>
                </Box>
              </HStack>
            </Flex>
          </Center>
        </Box>
      </Box>
    );
  }
}

export default HomeMain;
