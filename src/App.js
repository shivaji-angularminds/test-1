
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Form from "./components/Form";
import List from "./components/List";
import Edit from "./components/Edit"


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/"  element={<List/>}  />
           
          
          <Route path="/add" element={<Form/>} />
          <Route path="/edit/:index" element={<Edit/>} />
            
         
        </Routes>
     
      </Router>
     </div>
  );
}

export default App;
