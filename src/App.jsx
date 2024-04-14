import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'


function App() {


  return (
    <>
    <Navbar/>
    <div className=" bg-green-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
    <Manager/>
    </div>
     
  
    </>
  )
}

export default App
