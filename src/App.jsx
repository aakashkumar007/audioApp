/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Player from './component/Player';
import Audio from './component/Audio';
import Src from './Src';

function App() {
  

  return(
    <BrowserRouter>
      <Routes>
       
        <Route  path="/" element={<Player/>}/>
       

      </Routes>
    </BrowserRouter>
   
  )
}

export default App
