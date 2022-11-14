import './App.css';
import { useState } from 'react'
import { StateEngine } from './StateEngine'
import { Flex } from '@chakra-ui/react'

const App = () => {
  const [bracketView, setBracketView] = useState(false)
  return (
    <div className="App">
        <Flex bg='#282c34' minH='100vh' color='white' h='100%' w='100%' maxH='100vh' maxW='100vw' textAlign='center' px={!bracketView && '11vw'} pt={!bracketView && '12vh'}>
         <StateEngine setView={setBracketView}/>
        </Flex>
    </div>
  );
}

export default App;
