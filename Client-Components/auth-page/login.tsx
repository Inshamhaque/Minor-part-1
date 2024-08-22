import logo from '@/assets/amu_logo.png'
import './login.css'
import Image from 'next/image'
function Login(){
    return(<>

    <header className="header mb-5">
        <div className='header_details flex gap-x-1'>
            <Image  src={logo} alt="Logo" className="logo"/>
            <h1 className="amu">ALIGARH MUSLIM UNIVERSITY</h1>
        </div>
    </header>
    <div className="container">
        <h2 className='text-2xl font-bold pt-5'>LOGIN</h2>
        <hr className="header-line"/>
        <div className="credentials">
            <label htmlFor="username">Username</label> <br />
                <input type="text" id = "username" placeholder="Enter username"/> <br />

            <label htmlFor="password">Password</label> <br />
                <input type="password" id = "password" placeholder="Enter password"/> <br />

            <button className="button">Login</button> <br />

            <hr className="header-line2"/>

        <div className="links">
            <a className = "forgot border" href="#">FORGOT PASSWORD</a>
            <a href="/auth/register" className="register">REGISTER</a>
        </div>
     </div>
    </div>
    </>)
}

export default Login