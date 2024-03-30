import React from 'react'
import Loginbg from '../asset/loginbg.jpg'
import LoginBox from '../components/login/LoginBox'
import TopHeadBarLog from '../components/login/TopHeadBarLog'

function login() {
return (
    
        <div  className='w-full absolute bg-no-repeat  h-full bg-cover'style={{ backgroundImage: `url(${Loginbg})` }}>
            <TopHeadBarLog/> 
            <LoginBox />  
                
        </div>
)
}

export default login
