import { Button, Text, Box, Center} from '@chakra-ui/react';

function App() {
  // この部分はコメントです
  const text = 'Hello World';
  const imgUrl = 'https://date-a-live4th-anime.com/common_old/images/10th/main.png';
  return (
    /* この部分はコメントです */
    <Box>
      {/* この部分はコメントです */}
      <Text px={"20px"}>
        {text}
      </Text>
      <Text fontSize='xl'color={"red.800"}>
        こんにちは
      </Text>
      <img src={imgUrl}/>
    </Box>
  );
}
export default App;

/*import React from 'react';
import {theme,Flex,Tooltip,Button,useToast,} from '@chakra-ui/react';

function App() {
  const toast = useToast();

  return (
      <Flex
        justifyContent='center'
        alignItems='center'
        minH="100vh"
      >
        <Tooltip
            placement='top'
            label='ボタンを押すとToastを表示します'
        >
          <Button
            colorScheme='green'
            onClick={()=> {
              toast({
                'title': 'Toastです',
                'description': '3秒間表示されます',
                'status': 'success',
                'duration': '3000',
                'isClosable': true,
              })
            }}
          >hover</Button>
        </Tooltip>
      </Flex>
  );
}

export default App;*/
