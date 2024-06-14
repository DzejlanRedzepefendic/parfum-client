import React from "react"
import AppRoute from "./routes/AppRoute"
import { AuthProvider } from "./context/AuthContext"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <React.Fragment>
      <AuthProvider>
      <AppRoute />
      </AuthProvider>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App
