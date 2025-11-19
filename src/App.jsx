import {Route, Routes} from "react-router-dom";
import ChatScreen from "./Screens/ChatScreen/ChatScreen.jsx";
import LoginScreen from "./Screens/LoginScreen/LoginScreen.jsx";
import './App.css'

export default function App()
{
    return (
        <div>
            <Routes>
                <Route path = '/' element = {<LoginScreen/>}/>
                <Route path = '/chat' element = {<ChatScreen/>}/>
                <Route path="/chat/:idFrom/:idTo?" element={<ChatScreen />} />
            </Routes>
        </div>
    )
}