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
import db from "./firebase";
import { collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import DefineTags from "./DefineTags";

function FileRegisterForm() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [inputFileName, setInputFileName] = useState("");
  const [inputFileDir, setInputFileDir] = useState("");
  const [inputFileAbs, setInputFileAbs] = useState("");
  const [inputFileTags, setInputFileTags] = useState([]);
  const HandleDelete = (tag) => {
    setCheckedItems(checkedItems.filter((t) => t.key !== tag.key));
  };

  return (
    <VStack>
      <Box w="50vw" border="1px solid #00ffff" p={4} mt={4}>
        <FormControl>
          <FormLabel mt={1} htmlFor="name">
            ファイル名
          </FormLabel>
          <Input
            id="name"
            w="500px"
            placeholder="Basic usage"
            size="lg"
            mb={4}
            value={inputFileName}
            onChange={(e) => setInputFileName(e.target.value)}
          />
          <FormLabel mt={1} htmlFor="name">
            ファイル場所
          </FormLabel>
          <Input
            id="dir"
            w="500px"
            placeholder="Basic usage"
            size="lg"
            mb={4}
            value={inputFileDir}
            onChange={(e) => setInputFileDir(e.target.value)}
          />
          <FormLabel mt={1} htmlFor="name">
            概要
          </FormLabel>
          <Textarea
            type="abs"
            w="500px"
            placeholder="Basic usage"
            size="lg"
            mb={4}
            value={inputFileAbs}
            onChange={(e) => setInputFileAbs(e.target.value)}
          />
          <FormLabel mt={1} htmlFor="name">
            タグ
          </FormLabel>
          <HStack>
            {/* <Box bg={"#E2E8F0"} p={4} rounded="base">
              <Text fontSize="lg">tab_name</Text>
            </Box> */}
            {/* 枠線をつけて、タグを表示する 枠線の色はinputと同じ、やや太い枠*/}
            <HStack width={"35vw"} border="1px solid #CBD5E0" borderRadius="md" p={3}>
              {checkedItems.map((tag) => (
                <Tag key={tag.key} size="sm" borderRadius="full" variant="solid" colorScheme="green">
                  <TagLabel>{tag.name}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      HandleDelete(tag);
                    }}
                  />
                </Tag>
              ))}
            </HStack>
            <Popover placement="top" closeOnBlur={false}>
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
                  <DefineTags checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
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
              <Button
                size="lg"
                mb={4}
                onClick={() =>
                  addData({ fileName: inputFileName, fileDir: inputFileDir, fileAbs: inputFileAbs, fileTags: [] })
                }
              >
                登録
              </Button>
            </LinkRouter>
            <Button
              size="lg"
              mb={4}
              onClick={() => {
                addData({ fileName: inputFileName, fileDir: inputFileDir, fileAbs: inputFileAbs, fileTags: [] });
                setInputFileName("");
                setInputFileDir("");
                setInputFileAbs("");
                setInputFileTags([]);
              }}
            >
              続けて登録
            </Button>
          </HStack>
        </Center>
      </Box>
    </VStack>
  );
}

export default FileRegisterForm;

// 関数addData(入力値:name=string)を定義
// 自動生成したドキュメント ID を使用してデータを追加する
// 問題なく追加できれば true を返し、エラーが発生した場合は false を返す
const addData = ({ fileName, fileDir, fileAbs, fileTags }) => {
  try {
    if (fileName === "") {
      return false;
    }
    const addDataRef = collection(db, "files");
    addDoc(addDataRef, {
      name: fileName,
      dir: fileDir,
      abs: fileAbs,
      tagIds: fileTags,
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
