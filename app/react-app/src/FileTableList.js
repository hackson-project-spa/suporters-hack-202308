import React from "react";
import { useEffect, useState } from "react";
import db from "./firebase";
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
} from "@chakra-ui/react";

function FileTableList() {
  const [tags, setTags] = useState([]);
  const [FileList, setFileList] = useState([]);

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

  return (
    // 配列の項目を横並びで表にする
    <VStack>
      <Box>
        <FormLabel mt={1} htmlFor="name">
          タグ名称検索
        </FormLabel>
        <HStack>
          <Input id="name" w="42vw" placeholder="Basic usage" size="lg" mb={4} />
          <Button size="lg" w="8vw" mb={4}>
            検索
          </Button>
        </HStack>
      </Box>

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
            {FileList.map((file) => (
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
                      <Tag size="sm" borderRadius="full" variant="solid" colorScheme="green">
                        {tags
                          .filter((tag) => tag.key === tagId)
                          .map((tag) => {
                            return <TagLabel>{tag.name}</TagLabel>;
                          })}
                        <TagCloseButton />
                      </Tag>
                    ))}
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <PopupFileDetail
                      fileName={file.name}
                      fileDir={file.dir}
                      fileAbs={file.abs}
                      fileTagIds={file.tagIds}
                      tags={tags}
                    />

                    <Button size="sm" borderRadius="full" variant="solid" colorScheme="red">
                      削除
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default FileTableList;

function PopupFileDetail({ fileName, fileDir, fileAbs, fileTagIds, tags }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [inputFileName, setInputFileName] = useState(fileName);
  const [inputFileDir, setInputFileDir] = useState(fileDir);
  const [inputFileAbs, setInputFileAbs] = useState(fileAbs);
  const [inputFileTagIds, setInputFileTagIds] = useState(fileTagIds);

  return (
    <>
      <Button size="sm" borderRadius="full" variant="solid" colorScheme="blue" onClick={onOpen}>
        詳細
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsInputDisabled(true);
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
                value={fileName}
                isReadOnly={isInputDisabled}
                value={inputFileName}
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
                value={fileDir}
                isReadOnly={isInputDisabled}
                value={inputFileDir}
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
                value={fileAbs}
                isReadOnly={isInputDisabled}
              />
            </Box>
            <Box>
              <FormLabel mt={1} htmlFor="name">
                ファイルタグ
              </FormLabel>
              <HStack>
                {/* 枠線をつけて、タグを表示する 枠線の色はinputと同じ、やや太い枠*/}
                <HStack width={"35vw"} border="1px solid #CBD5E0" borderRadius="md" p={3}>
                  {fileTagIds.map((tagId) => (
                    <Tag size="sm" borderRadius="full" variant="solid" colorScheme="green">
                      {tags
                        .filter((tag) => tag.key === tagId)
                        .map((tag) => {
                          return <TagLabel>{tag.name}</TagLabel>;
                        })}
                      <TagCloseButton />
                    </Tag>
                  ))}
                </HStack>
                {/* タグの編集ボタン */}
                <Button size="sm" borderRadius="full" variant="solid" colorScheme="blue">
                  タグ編集
                </Button>
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
              }}
            >
              Close
            </Button>

            {isInputDisabled ? (
              <Button mr={3} onClick={() => setIsInputDisabled(!isInputDisabled)}>
                編集
              </Button>
            ) : (
              <Button mr={3} onClick={() => setIsInputDisabled(!isInputDisabled)}>
                保存
              </Button>
            )}
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                // deleteDoc(doc(db, "files", "file-1"));
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
