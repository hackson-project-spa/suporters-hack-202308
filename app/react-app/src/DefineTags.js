import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, HStack, VStack, Text } from "@chakra-ui/react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function DefineTags() {
  const tags = [
    { id: 1, name: "tag1" },
    { id: 2, name: "tag2" },
  ];
  const [Tag, setCheckedItems] = useState([]);
  const handleCheckboxChange = (tag) => {
    let exists = false;

    for (const t of Tag) {
      if (tag.id === t.id) {
        exists = true;
        break;
      }
    }
    if (exists) {
      const newTags = Tag.filter((t) => t.id !== tag.id);
      setCheckedItems(newTags);
    } else {
      setCheckedItems([...Tag, tag]);
    }
    // const Name = event.target.value;
  };
  return (
    <Box>
      <VStack>
        {/* <Box border="1px solid #00ffff" p={4} mt={4}> */}
        <FormControl>
          <FormLabel mt={1} htmlFor="name">
            タグ名
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
            <Box p={1}>
              <Checkbox value={tag.name} onChange={() => handleCheckboxChange(tag)}>
                {tag.name}
              </Checkbox>
            </Box>
          ))}
        </CheckboxGroup>
      </Box>
      <Text>
        <handleCheckboxChange />
        選択内容：{Tag.map((tag) => tag.name)}
      </Text>
    </Box>
  );
}
export default DefineTags;
