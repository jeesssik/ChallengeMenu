import { Routes, Route } from "react-router-dom";
import DishItemDetail from "./components/search/DishItemDetail";
import Login from "./components/login/Login";
import Navbar from "./commons/Navbar";
import AuthProvider from "./context/useContextAuth";
import NoMatch from "./components/NoMatch";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/login/ProtectedRoute";
import MenuContextProvider from "./context/useContextMenu";
import DishSearch from "./components/search/DishSearch";
import Footer from "./commons/Footer";

function App() {

  return (
    <MenuContextProvider>
      <AuthProvider>
      <div className="wrapper">
        <Navbar />

        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
            
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
            
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <DishSearch />
              </ProtectedRoute>
            }
            />
          <Route
            path="/detalle/:dishId"
            element={
              <ProtectedRoute>
                <DishItemDetail /> 
              </ProtectedRoute>
            }
          />        

          <Route path="*" element={<NoMatch />} />

        </Routes>
      </div>

        <Footer />
      </AuthProvider>    
    </MenuContextProvider>
  )
}

export default App;
