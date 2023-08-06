import React from "react";
import { useEffect, useState } from "react";
import db from "./firebase";
import DefineTags from "./DefineTags";
import { collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import {
  Box,
  HStack,
  Button,
  Table,
  TableCaption,
  Thead,
  TableContainer,
  VStack,
  Tr,
  Th,
  Tbody,
  Td,
  FormLabel,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Text,
  Spacer,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
} from "@chakra-ui/react";

function FileTableList() {
  const testArray = ["b", "v", "s", "a"];

  const [tags, setTags] = useState([]);
  const [FileList, setFileList] = useState([]);
  const [fileListWithTagNames, setFileListWithTagNames] = useState([]);
  const [indexFileName, setIndexFileName] = useState("");
  const [indexFileDir, setIndexFileDir] = useState("");
  const [indexFileAbs, setIndexFileAbs] = useState("");
  const [indexFileTagIds, setIndexFileTagIds] = useState([]);
  const [searchTags, setSearchTags] = useState(false);

  useEffect(() => {
    const firebaseData = query(collection(db, "tags"), where("name", "!=", ""));
    const firebaseFileData = query(collection(db, "files"), where("name", "!=", ""));
    getDocs(firebaseData).then((snapshot) => {
      setTags(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });
    getDocs(firebaseFileData).then((snapshot) => {
      setFileList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    onSnapshot(firebaseData, (snapshot) => {
      setTags(snapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() })));
    });
    onSnapshot(firebaseFileData, (snapshot) => {
      setFileList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    setFileListWithTagNames(
      FileList.map((file) => ({
        id: file.id,
        name: file.name,
        dir: file.dir,
        abs: file.abs,
        tagIds: file.tagIds.map((tagId) => {
          return { key: tagId, name: tags.filter((tag) => tag.key === tagId)[0].name };
        }),
      }))
    );
  }, [FileList, tags]);

  const indexFunc = () => {
    const firebaseFileData = query(collection(db, "files"), where("name", "!=", ""));
    getDocs(firebaseFileData).then((snapshot) => {
      setFileList(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((file) => {
            console.log(indexFileTagIds.every((tagId) => file.tagIds.includes(tagId)));
            return (
              file.name.includes(indexFileName) &&
              file.dir.includes(indexFileDir) &&
              file.abs.includes(indexFileAbs) &&
              indexFileTagIds.every((tagId) => file.tagIds.includes(tagId.key))
            );
          })
      );
      console.log(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    setIndexFileName("");
    setIndexFileDir("");
    setIndexFileAbs("");
    setIndexFileTagIds([]);
  };

  return (
    // 配列の項目を横並びで表にする
    <VStack>
      {/* 枠線をつけえる */}
      <Box mt={3} border="1px solid #CBD5E0" borderRadius="md" p={3}>
        {/* ファイル名称、場所、概要、タグで検索。
        タグ検索は含むタグをリストから複数選択させ、選択したもの全てを含むものを検索
        検索ボタンは一つで、or検索かand検索かを選べる*/}
        <HStack mb={3}>
          <HStack mr={5}>
            <FormLabel mt={1} htmlFor="name" w="7vw" mb={4}>
              ファイル名称
            </FormLabel>
            <Input
              id="city"
              w="21vw"
              placeholder="Basic usage"
              // size="md"
              h="4vh"
              mb={4}
              value={indexFileName}
              onChange={(e) => {
                setIndexFileName(e.target.value);
              }}
              onClick={() => {
                setSearchTags(false);
              }}
            />
          </HStack>
          <HStack>
            <FormLabel mt={1} htmlFor="name" w="3vw" mb={4}>
              場所
            </FormLabel>
            <Input
              id="tel"
              w="21vw"
              placeholder="Basic usage"
              // size="md"
              h="4vh"
              mb={4}
              value={indexFileDir}
              onChange={(e) => {
                setIndexFileDir(e.target.value);
              }}
              onClick={() => {
                setSearchTags(false);
              }}
            />
          </HStack>
        </HStack>
        {/* タグはリストから複数選択させる */}
        <HStack mb={3}>
          <HStack mr={5}>
            <FormLabel mt={1} htmlFor="name" w="7vw" mb={2}>
              概要
            </FormLabel>
            <Input
              id="name"
              w="21vw"
              placeholder="Basic usage"
              // size="md"
              h="4vh"
              mb={2}
              value={indexFileAbs}
              onChange={(e) => {
                setIndexFileAbs(e.target.value);
              }}
              onClick={() => {
                setSearchTags(false);
              }}
            />
          </HStack>
          <HStack>
            <FormLabel mt={1} htmlFor="name" w="3vw" mb={2}>
              タグ
            </FormLabel>
            <HStack>
              <HStack p={1} width={"21vw"} border="1px solid #CBD5E0" borderRadius="md" mb={2} height={"4vh"}>
                {indexFileTagIds.map((tag) => (
                  <Tag key={tag.key} size="sm" borderRadius="full" variant="solid" colorScheme="green">
                    <TagLabel>{tag.name}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        setIndexFileTagIds(indexFileTagIds.filter((t) => t.key !== tag.key));
                      }}
                    />
                  </Tag>
                ))}
              </HStack>
            </HStack>
            {/* タグの編集ボタン */}

            <Popover placement="bottom" closeOnBlur={false} isOpen={searchTags}>
              <PopoverTrigger>
                <Button
                  mb={2}
                  size="sm"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    setSearchTags(!searchTags);
                  }}
                >
                  タグ検索
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton
                  onClick={() => {
                    setSearchTags(false);
                  }}
                />
                <PopoverHeader>タグを選択</PopoverHeader>
                <PopoverBody>
                  <DefineTags checkedItems={indexFileTagIds} setCheckedItems={setIndexFileTagIds} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </HStack>
        {/* 検索ボタン */}
        <VStack direction="row" spacing={4} align="center">
          <HStack>
            <Button
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
              mb={3}
              onClick={() => {
                indexFunc();
                setSearchTags(false);
              }}
            >
              検索
            </Button>
            <Button
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="red"
              mb={3}
              onClick={() => {
                setSearchTags(false);
                setIndexFileName("");
                setIndexFileDir("");
                setIndexFileAbs("");
                setIndexFileTagIds([]);
                indexFunc();
              }}
            >
              クリア
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* ファイル一覧 */}
      <Spacer />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ファイル名称</Th>
              <Th>場所</Th>
              <Th>概要</Th>
              <Th>タグ</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fileListWithTagNames.map((file) => (
              <Tr key={file.id}>
                <Td>{file.name}</Td>
                <Td>{file.dir}</Td>
                {/* 10文字以上の場合は、10文字目以降は「...」と表示する */}
                <Td>
                  {file.abs.length > 10 ? (
                    <Box>
                      {file.abs.slice(0, 10)}
                      ...
                    </Box>
                  ) : (
                    <Box>{file.abs}</Box>
                  )}
                </Td>
                <Td>
                  <HStack>
                    {file.tagIds.map((tagId) => (
                      <Tag size="sm" borderRadius="full" variant="solid" colorScheme="green" key={tagId.key + file.id}>
                        <TagLabel key={tagId.key + file.id + "tag"}>{tagId.name}</TagLabel>
                        {/* <TagCloseButton /> */}
                      </Tag>
                    ))}
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <PopupFileDetail
                      fileId={file.id}
                      fileName={file.name}
                      fileDir={file.dir}
                      fileAbs={file.abs}
                      fileTagIds={file.tagIds}
                      tags={tags}
                    />

                    <Button
                      size="sm"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="red"
                      onClick={() => {
                        deleteData({ fileId: file.id });
                      }}
                    >
                      削除
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {console.log("FileList", FileList)}
      {console.log("fileListWithTagNames", fileListWithTagNames)}
    </VStack>
  );
}

export default FileTableList;

function PopupFileDetail({ fileId, fileName, fileDir, fileAbs, fileTagIds, tags }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [inputFileName, setInputFileName] = useState(fileName);
  const [inputFileDir, setInputFileDir] = useState(fileDir);
  const [inputFileAbs, setInputFileAbs] = useState(fileAbs);
  const [inputFileTagIds, setInputFileTagIds] = useState(fileTagIds);
  const [isTagPopClose, setIsTagPopClose] = useState(false);
  const [isTagEdit, setIsTagEdit] = useState(false);
  const tagIdsInitial = fileTagIds;

  const HandleDelete = (tag) => {
    setInputFileTagIds(inputFileTagIds.filter((t) => t.key !== tag.key));
  };

  return (
    <>
      <Button size="sm" borderRadius="full" variant="solid" colorScheme="blue" onClick={onOpen}>
        詳細
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          if (!isInputDisabled) {
            setInputFileTagIds(tagIdsInitial);
            setIsInputDisabled(true);
          }
        }}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ファイル詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel mt={1} htmlFor="name">
                ファイル名称
              </FormLabel>
              <Input
                id="name"
                w="42vw"
                placeholder="Basic usage"
                size="lg"
                mb={4}
                value={inputFileName}
                isReadOnly={isInputDisabled}
                onChange={(e) => {
                  setInputFileName(e.target.value);
                }}
              />
            </Box>
            <Box>
              <FormLabel mt={1} htmlFor="name">
                ファイル場所
              </FormLabel>
              <Input
                id="name"
                w="42vw"
                placeholder="Basic usage"
                size="lg"
                mb={4}
                value={inputFileDir}
                isReadOnly={isInputDisabled}
                onChange={(e) => {
                  setInputFileDir(e.target.value);
                }}
              />
            </Box>
            <Box>
              <FormLabel mt={1} htmlFor="name">
                ファイル概要
              </FormLabel>
              <Textarea
                id="name"
                w="42vw"
                h="15vw"
                placeholder="Basic usage"
                size="lg"
                mb={4}
                value={inputFileAbs}
                isReadOnly={isInputDisabled}
                onChange={(e) => {
                  setInputFileAbs(e.target.value);
                }}
              />
            </Box>
            <Box>
              <FormLabel mt={1} htmlFor="name">
                ファイルタグ
              </FormLabel>
              <HStack>
                {/* 枠線をつけて、タグを表示する 枠線の色はinputと同じ、やや太い枠*/}
                <HStack width={"35vw"} border="1px solid #CBD5E0" borderRadius="md" p={3}>
                  {inputFileTagIds.map((tag) => (
                    <Tag key={tag.key} size="sm" borderRadius="full" variant="solid" colorScheme="green">
                      <TagLabel>{tag.name}</TagLabel>
                      {isInputDisabled ? null : (
                        <TagCloseButton
                          onClick={() => {
                            HandleDelete(tag);
                          }}
                          isDisabled={isInputDisabled}
                        />
                      )}
                    </Tag>
                  ))}
                </HStack>
                {/* タグの編集ボタン */}

                <Popover placement="bottom" closeOnBlur={false} isOpen={isTagEdit && isTagPopClose}>
                  <PopoverTrigger>
                    <Button
                      size="sm"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      isDisabled={isInputDisabled}
                      onClick={() => {
                        setIsTagEdit(!isTagEdit);
                      }}
                    >
                      タグ編集
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton
                      onClick={() => {
                        setIsTagEdit(!isTagEdit);
                      }}
                    />
                    <PopoverHeader>タグを選択</PopoverHeader>
                    <PopoverBody>
                      <DefineTags checkedItems={inputFileTagIds} setCheckedItems={setInputFileTagIds} />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setIsInputDisabled(true);
                setIsTagEdit(false);
              }}
            >
              Close
            </Button>

            {isInputDisabled ? (
              <Button
                mr={3}
                onClick={() => {
                  setIsInputDisabled(!isInputDisabled);
                  setIsTagPopClose(true);
                }}
              >
                編集
              </Button>
            ) : (
              <Button
                mr={3}
                onClick={() => {
                  setIsInputDisabled(!isInputDisabled);
                  setIsTagPopClose(false);
                  setIsTagEdit(false);
                  updateData({
                    fileId: fileId,
                    name: inputFileName,
                    dir: inputFileDir,
                    abs: inputFileAbs,
                    tagIds: inputFileTagIds.map((tag) => tag.key),
                  });
                }}
              >
                保存
              </Button>
            )}
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                deleteData({ fileId: fileId });
                onClose();
                setIsInputDisabled(true);
              }}
            >
              削除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

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

//関数updateData
//ドキュメント ID を使用してデータを更新する
//問題なく更新できれば true を返し、エラーが発生した場合は false を返す
const updateData = ({ fileId, name, dir, abs, tagIds }) => {
  try {
    if (name === "") {
      return false;
    }
    const updateDataRef = doc(db, "files", fileId);
    updateDoc(updateDataRef, {
      name: name,
      dir: dir,
      abs: abs,
      tagIds: tagIds,
    });
    console.log("Document successfully updated!");
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//関数deleteData(入力値:tagId=string)を定義
//ドキュメント ID を使用してデータを削除する
//問題なく削除できれば true を返し、エラーが発生した場合は false を返す
const deleteData = ({ fileId }) => {
  try {
    const deleteDataRef = doc(db, "files", fileId);
    deleteDoc(deleteDataRef);
    console.log("Document successfully deleted!");
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
