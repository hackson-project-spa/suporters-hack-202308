import React from "react";
import { Box, Button, HStack, VStack, Text, Tr, Td } from "@chakra-ui/react";
import { Input, FormControl, Table, Tbody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import db from "./firebase";
import { collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";

function DefineTags({ checkedItems, setCheckedItems }) {
  const [tags, setTags] = useState([]);
  const [eternal, setEternal] = useState([]);
  const [inputSearchTag, setInputSearchTag] = useState("");
  // const [checkedItems, setCheckedItems] = useState([]);

  const HandleCheckboxChange = (tag) => {
    let exists = false;
    if (checkedItems.length <= 2) {
      for (const t of checkedItems) {
        if (tag.key === t.key) {
          exists = true;
          break;
        }
      }
      if (exists) {
        const newCheckedItems = checkedItems.filter((t) => t.key !== tag.key);
        setCheckedItems(newCheckedItems);
      } else {
        setCheckedItems([...checkedItems, tag]);
      }
    } else {
      alert("タグは3つまでです");
    }
  };

  useEffect(() => {
    const firebaseData = query(collection(db, "tags"), where("name", "!=", ""));
    getDocs(firebaseData).then((snapshot) => {
      setEternal(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });
    onSnapshot(firebaseData, (snapshot) => {
      setEternal(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });
  }, []);
  useEffect(() => {
    setTags(eternal.filter((tab) => tab.name.includes(inputSearchTag) && checkedItems.every((t) => t.key !== tab.key)));
  }, [checkedItems]);

  useEffect(() => {
    setTags(eternal);
  }, [eternal]);

  return (
    <Box>
      <VStack>
        {/* <Box border="1px solid #00ffff" p={4} mt={4}> */}
        <FormControl>
          <HStack>
            <Input
              id="name"
              w="500px"
              placeholder="Basic usage"
              size="lg"
              mb={4}
              value={inputSearchTag}
              onChange={(e) => {
                setInputSearchTag(e.target.value);
              }}
            />
            <Button
              size="lg"
              mb={4}
              onClick={() => {
                setTags(
                  eternal.filter((tab) => tab.name.includes(inputSearchTag) && checkedItems.every((t) => t.key !== tab.key))
                );
              }}
            >
              検索
            </Button>
          </HStack>
        </FormControl>
      </VStack>
      <Box overflowY="auto" maxH="40vh">
        <Table size={"sm"}>
          <Tbody>
            {tags.map((tag) => (
              <Tr key={tag.key}>
                <Td>
                  <Text fontSize={"sm"}>{tag.name}</Text>
                </Td>
                <Td>
                  <Button
                    onClick={() => {
                      HandleCheckboxChange(tag);
                    }}
                    colorScheme="blue"
                    fontSize={"sm"}
                    h={"3vh"}
                  >
                    追加
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* <Text>選択内容：{checkedItems.map((tag) => tag.name)}</Text> */}
    </Box>
  );
}
export default DefineTags;
