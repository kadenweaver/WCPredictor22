import './App.css';
import { StateEngine } from './StateEngine'
import { Flex } from '@chakra-ui/react'

const App = () => {
  return (
    <div className="App">
        <Flex bg='#282c34' minH='100vh' color='white' h='100%' w='100%' maxH='100vh' maxW='100vw' textAlign='center' px='11vw' pt='12vh'>
         <StateEngine/>
        </Flex>
    </div>
  );
}

export default App;
