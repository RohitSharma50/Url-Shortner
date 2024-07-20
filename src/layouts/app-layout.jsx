import {Outlet} from "react-router-dom";
import Header from "../components/header";

 const AppLayout = () => {
  return (
  <div>
    <main className="min-h-screen container">
       <Header/>
       <Outlet /> 
       
    </main> 
    {/* footer */}
    <div className="p-10 text-center bg-gray-700">Made with <a href='https://react.dev/' className="hover:bg-pink-800 hover:text-xl"> React</a> +  <a href="https://vitejs.dev/" className="hover:bg-pink-800 hover:text-xl">Vite </a> by <a href="https://www.linkedin.com/in/rohit-sharma50/" className="hover:bg-red-300">Rohit Sharma</a> </div>
  </div>
  );
};
export default AppLayout;