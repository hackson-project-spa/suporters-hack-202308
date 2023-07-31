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

class TabMain extends React.Component {
  render() {
    const posts = [
      {
        id: 3,
        title: "title3",
        body: "body3",
      },
      {
        id: 1,
        title: "tissssssstle1",
        body: "body1",
      },
      {
        id: 2,
        title: "title2",
        body: "body2",
      },
      {
        id: 3,
        title: "title3",
        body: "body3",
      },
      {
        id: 1,
        title: "tissssssstle1",
        body: "body1",
      },
      {
        id: 2,
        title: "title2",
        body: "body2",
      },
      {
        id: 3,
        title: "title3",
        body: "body3",
      },
      {
        id: 1,
        title: "tissssssstle1",
        body: "body1",
      },
      {
        id: 2,
        title: "title2",
        body: "body2",
      },
      {
        id: 3,
        title: "title3",
        body: "body3",
      },
      {
        id: 1,
        title: "tissssssstle1",
        body: "body1",
      },
      {
        id: 2,
        title: "title2",
        body: "body2",
      },
      {
        id: 3,
        title: "title3",
        body: "body3",
      },
    ];

    // 1. Create a text input component
    const TextInput = React.forwardRef((props, ref) => {
      return (
        <FormControl>
          <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
          <Input ref={ref} id={props.id} {...props} />
        </FormControl>
      );
    });

    // 2. Create the form
    const Form = ({ firstFieldRef, onCancel, tagId, tagName }) => {
      return (
        <Stack spacing={4}>
          <TextInput label="タグ名称" id={tagId} ref={firstFieldRef} defaultValue={tagName} />
          <ButtonGroup>
            <Button variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
            <Button colorScheme="teal">更新</Button>
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
            closeOnBlur={false}
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

    return (
      <VStack>
        <Box w="50vw" border="1px solid #00ffff" p={4} mt={4}>
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
          <Box overflowY="auto" maxH="50vw" w="50vw">
            {posts.map((post) => (
              <Stack key={post.id} spacing={4} p={4} shadow="md" borderWidth="1px" w="47vw" mb={3}>
                <HStack>
                  <Text w="38vw" fontSize="sm">
                    {post.title}
                  </Text>
                  <PopoverForm tagId={post.id} tagName={post.title} />
                  <Button size="sm">削除</Button>
                </HStack>
              </Stack>
            ))}
          </Box>
        </Box>

        <Box w="50vw" border="1px solid #00ffff" p={4} mt={4}>
          <FormLabel htmlFor="name">タグ名称新規登録</FormLabel>
          <HStack>
            <Input id="name" w="500px" placeholder="Basic usage" size="lg" mb={4} />
            <Button size="lg" mb={4}>
              登録
            </Button>
          </HStack>
        </Box>
      </VStack>
    );
  }
}

export default TabMain;
