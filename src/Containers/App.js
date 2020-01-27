import React, { useState } from 'react'
import Header from './Header/Header'
import Workspace from './Workspace/Workspace'
import Cart from './Cart/Cart'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components'

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Config toaster global
  toast.configure()

  return (
    <AppContainer>
      <Header onClickRightButtons={() => setIsCartOpen(true)}/>
      <Workspace />
      {isCartOpen && <Cart isOpen={isCartOpen} handleClose={() => setIsCartOpen(false)}/>}
    </AppContainer>
  );
}

export default App;
