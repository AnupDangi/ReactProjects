import './App.css'
import menus from './components/data'
import TreeView from "./components/TreeView"
function App() {

  return (
  <>
    <TreeView menus={menus}/>  
    </>
  )
}

export default App
