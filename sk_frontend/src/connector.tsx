import { Link } from "react-router-dom"
import "./App.css"
import Footer from "./components/footer"
interface Connector {}
const Connector : React.FC<Connector> = ({})=>{
  return(
    <>
      <div className="container h-lvh w-lvw flex flex-col justify-between items-center bg-[url(../images/background.jpg)] bg-cover bg-center gap-0 overflow-hidden">
        <div className="navbar h-[9vh] w-[100vw] relative flex flex-row justify-between items-center">
            <div id="logo h-[60px] w-[200px] ml-[30px]"><img src="images/logo.png" alt="" id="logo_img" className="h-[60px] w-[200px]"/></div>
            {/* <div className="sign h-[100%] w-[20%] flex flex-row justify-evenly items-center">
                <button className="btn_sign h-[80%] w-[40%] rounded-[30px] bg-transparent border-[3px] border-[rgb(241,186,6)] transition duration-500 ease-in-out] hover:bg-[rgb(241,186,6,0.7)] "><Link to="/login" className="head_text text-lg font-sans text-[rgb(241,186,6)] text-[17px] relative">Sign In</Link></button>
            </div> */}
        </div>
        <div className="main h-[50vh] w-[50vw] flex flex-col items-center justify-evenly">
            <div id="head" className="h-[10%] w-[35%] flex justify-center items-center bg-[rbga(255,200,0,0.359)] rounded-[5px] border-[3px] border-[rgb(240,244,4)]">
                <div className="head_img h-[100%] w-[15%] flex justify-start items-center"><img src="images/plus.png" alt="" id="plus" className="h-[40px] w-[40px]"/></div>
                <div className="head_write h-[100%] w-[85%] flex flex-col justify-center items-start bg-yellow-600"><p id="text" className="font-sans text-xl text-[rgb(240,244,4) font-bold] p-2">Continue as a</p></div></div>
            <div className="content h-[70%] w-[100%] flex items-center justify-evenly">
                <div className="inside h-[70%] w-[20%] flex flex-col items-center">
                    <div className="img h-[80%] w-[100%] flex justify-center"><img src="images/client.png" alt="" className="pic h-[154px] w-[154px]"/></div>
                    <div className="text h-[20%] w-[100%] flex justify-center items-center transition ease-out duration-300 hover:bg-[rgba(241,174,6,0.7)]"><Link to="/client/login" className="choose font-sans text-lg text-[rgb(241,186,6)] relative">Client</Link></div>
                </div>
                <div className="inside h-[70%] w-[20%] flex flex-col items-center">
                    <div className="img h-[80%] w-[100%] flex justify-center"><img src="images/freelancer.png" alt="" className="pic h-[154px] w-[154px]"/></div>
                    <div className="text h-[20%] w-[100%] flex justify-center items-center transition ease-out duration-300 hover:bg-[rgba(241,174,6,0.7)]"><Link to="/freelancer/login" className="choose font-sans text-lg text-[rgb(241,186,6)] relative">Freelancer</Link></div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
    </>
  )
}

export default Connector