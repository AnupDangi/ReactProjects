import Header from "./components/Header/Header";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/home";
import AddNewBlog from "./pages/addblog/addblog";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="pt-4 pb-8">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/addblog" element={<AddNewBlog/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
