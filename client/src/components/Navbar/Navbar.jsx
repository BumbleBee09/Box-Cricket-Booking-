import React, {useContext} from 'react'
import { UserContext } from '../../App';
import Afterlogin from './Afterlogin';
import Beforelogin from './Beforelogin';

const Navbar = () => {
  
  const {state} = useContext(UserContext);

  const RenderMenu = () => {
    if(state){
      console.log("STATE is TRUE")
      return(
        <>
        <Afterlogin />
        </>
      )
    }else{
      console.log("STATE is False")
      return(
        <>
          <Beforelogin />
        </>
      )
    }
  }
  return (
    <>
    {state}
    <RenderMenu />
    </>
  )
}

export default Navbar
