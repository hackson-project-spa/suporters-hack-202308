import React from "react";
import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  FormControl,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import db from "./firebase";
import { collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

function TabMain() {
  const [tabs, setTabs] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [inputSearchTag, setInputSearchTag] = useState("");

  useEffect(() => {
    const firebaseData = query(collection(db, "tags"), where("name", "!=", ""));
    getDocs(firebaseData).then((snapshot) => {
      setTabs(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });

    onSnapshot(firebaseData, (snapshot) => {
      setTabs(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <VStack>
      <Box w="50vw" border="1px solid #00ffff" p={4} mt={4}>
        <Box>
          <FormLabel mt={1} htmlFor="name">
            タグ名称検索
          </FormLabel>
          <HStack>
            <Input
              id="name"
              w="42vw"
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
              w="8vw"
              mb={4}
              onClick={() => {
                const firebaseData = query(collection(db, "tags"), where("name", "!=", ""));

                getDocs(firebaseData).then((snapshot) => {
                  setTabs(
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
        </Box>
        <Box overflowY="auto" maxH="32vw" w="50vw">
          {tabs.map((tab) => (
            <Stack key={tab.key} spacing={2} p={3} shadow="sm" borderWidth="1px" w="47vw" mb={2}>
              <HStack>
                <Text w="38vw" fontSize="sm">
                  {tab.name}
                </Text>
                <PopoverForm tagId={tab.key} tagName={tab.name} />
                <Button size="sm" onClick={() => deleteData({ tagId: tab.key })}>
                  削除
                </Button>
              </HStack>
            </Stack>
          ))}
        </Box>
      </Box>

      <Box w="50vw" border="1px solid #00ffff" p={4} mt={4}>
        <FormLabel htmlFor="name">タグ名称新規登録</FormLabel>
        <HStack>
          <Input
            id="name"
            w="500px"
            placeholder="Basic usage"
            size="lg"
            mb={4}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button
            size="lg"
            mb={4}
            onClick={() => {
              if (addData({ name: newTag })) {
                setNewTag("");
                setInputSearchTag("");
              }
            }}
          >
            登録
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
}

// 1. Create a text input component
// const TextInput = React.forwardRef((props, ref, editTag, setEditTag) => {
//   return (
//     <FormControl>
//       <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
//       <Input ref={ref} id={props.id} {...props} value={editTag} onChange={(e) => setEditTag(e.target.value)} />
//     </FormControl>
//   );
// });

// 2. Create the form
const Form = ({ firstFieldRef, onCancel, tagId, tagName }) => {
  const [editTag, setEditTag] = useState(tagName);

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor={tagId}>タグ名称</FormLabel>
        <Input ref={firstFieldRef} id={tagId} value={editTag} onChange={(e) => setEditTag(e.target.value)} />
      </FormControl>
      <ButtonGroup>
        <Button variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button
          colorScheme="teal"
          type="submit"
          onClick={() => {
            if (tagName === editTag) {
              return;
            }
            updateData({ tagId: tagId, name: editTag });
            onCancel();
          }}
        >
          更新
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const PopoverForm = ({ tagId, tagName }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      {/* <Box display="inline-block" mr={3}>
          {tagName}
        </Box> */}
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button size="sm">編集</Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} tagId={tagId} tagName={tagName} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

// 関数addData(入力値:name=string)を定義
// 自動生成したドキュメント ID を使用してデータを追加する
// 問題なく追加できれば true を返し、エラーが発生した場合は false を返す
const addData = ({ name }) => {
  try {
    if (name === "") {
      return false;
    }
    const addDataRef = collection(db, "tags");
    addDoc(addDataRef, {
      name: name,
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//関数updateData(入力値:tagId=string, name=string)を定義
//ドキュメント ID を使用してデータを更新する
//問題なく更新できれば true を返し、エラーが発生した場合は false を返す
const updateData = ({ tagId, name }) => {
  try {
    if (name === "") {
      return false;
    }
    const updateDataRef = doc(db, "tags", tagId);
    updateDoc(updateDataRef, {
      name: name,
    });
    console.log("Document successfully updated!");
    console.log(tagId, name);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//関数deleteData(入力値:tagId=string)を定義
//ドキュメント ID を使用してデータを削除する
//問題なく削除できれば true を返し、エラーが発生した場合は false を返す
const deleteData = ({ tagId }) => {
  try {
    const deleteDataRef = doc(db, "tags", tagId);
    deleteDoc(deleteDataRef);
    console.log("Document successfully deleted!");
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export default TabMain;
