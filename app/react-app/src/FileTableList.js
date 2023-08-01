import React from "react";
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
} from "@chakra-ui/react";

const FileList = [
  {
    id: 1,
    name: "test1",
    dir: "/index",
    abs: "テスト1なんだけど、失敗した",
    tagIds: [1, 2],
  },
  {
    id: 2,
    name: "test2",
    dir: "/register",
    abs: "テスト2なんだけど、失敗した",
    tagIds: [1, 3],
  },
  {
    id: 3,
    name: "test3",
    dir: "/tag",
    abs: "テスト3なんだけど、失敗した",
    tagIds: [2, 3],
  },
];

const TagList = [
  {
    id: 1,
    name: "あああああaaaaああああ",
  },
  {
    id: 2,
    name: "タグ2",
  },
  {
    id: 3,
    name: "タグssss3",
  },
];

function FileTableList() {
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
                      <Tag key={tagId} size="sm" borderRadius="full" variant="solid" colorScheme="green">
                        <TagLabel>{TagList.find((tag) => tag.id === tagId).name}</TagLabel>
                        <TagCloseButton />
                      </Tag>
                    ))}
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <Button size="sm" borderRadius="full" variant="solid" colorScheme="green">
                      詳細
                    </Button>
                    <Button size="sm" borderRadius="full" variant="solid" colorScheme="green">
                      編集
                    </Button>
                    <Button size="sm" borderRadius="full" variant="solid" colorScheme="green">
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
