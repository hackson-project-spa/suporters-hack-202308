import React from "react";
import { Box, Button, HStack, VStack, Text } from "@chakra-ui/react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import db from "./firebase";
import { collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";

function DefineTags() {
  const [tags, setTags] = useState([]);
  const [inputSearchTag, setInputSearchTag] = useState("");

  useEffect(() => {
    const firebaseData = query(collection(db, "tags"), where("name", "!=", ""));
    getDocs(firebaseData).then((snapshot) => {
      setTags(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });

    onSnapshot(firebaseData, (snapshot) => {
      setTags(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <Box>
      <VStack>
        {/* <Box border="1px solid #00ffff" p={4} mt={4}> */}
        <FormControl>
          <FormLabel mt={1} htmlFor="name">
            タグ名
          </FormLabel>
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
                const firebaseData = query(collection(db, "tags"), where("name", "!=", ""));

                getDocs(firebaseData).then((snapshot) => {
                  setTags(
                    snapshot.docs
                      .map((doc) => ({ key: doc.id, ...doc.data() }))
                      .filter((tab) => tab.name.includes(inputSearchTag))
                  );
                });
              }}
            >
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
