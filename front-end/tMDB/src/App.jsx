
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="App">
      
      <h2>Movies Lib</h2>
      <Outlet />
    </div>
  )
}

export default App
