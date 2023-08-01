import React from "react";
import { Box, Button, HStack, VStack, Text } from "@chakra-ui/react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function DefineTags() {
  const tags = [
    { id: 1, name: "tag1" },
    { id: 2, name: "tag2" },
    { id: 3, name: "tag3" },
    { id: 4, name: "tag4" },
    { id: 5, name: "tag5" },
    { id: 5, name: "tag5" },
    { id: 5, name: "tag5" },
    { id: 5, name: "tag5" },
    { id: 5, name: "tag5" },
  ];
  return (
    <Box>
      <VStack>
        {/* <Box border="1px solid #00ffff" p={4} mt={4}> */}
        <FormControl>
          <FormLabel mt={1} htmlFor="name">
            ファイル名
          </FormLabel>
          <HStack>
            <Input id="name" w="500px" placeholder="Basic usage" size="lg" mb={4} />
            <Button size="lg" mb={4}>
              検索
            </Button>
          </HStack>
        </FormControl>
      </VStack>
      <Box overflowY="auto" maxH="10vw">
        <CheckboxGroup>
          {tags.map((tag) => (
            <Box>
              <Checkbox>{tag.name}</Checkbox>
            </Box>
          ))}
        </CheckboxGroup>
      </Box>
    </Box>
  );
}
export default DefineTags;
