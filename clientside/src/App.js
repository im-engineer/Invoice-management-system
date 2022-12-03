import './App.css';
import Navbar from './Component/Navbar'
import{Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Sidebar from './Component/Sidebar'
// import bgImages from './video/video3.mp4'
import { useSelector } from 'react-redux/es/exports';

function App() {
  const user = useSelector((state) => state.auth);
  return (
    <>
    <div className="App">
          <Navbar/>
          {
            user.isLoggedIn ? (<div><Sidebar /> <Routes>
              <Route path="/login" element={<Login />} ></Route>
              </Routes></div>) : (<div><Routes>
              
            </Routes></div>)
          }
          <Routes>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/home" element={<Home />} ></Route>

          </Routes>
          {/* <video autoPlay loop muted>
            <source src={bgImages} type="video/mp4"></source>
          </video> */}
      
    </div>
    </>
  );
}

export default App;
