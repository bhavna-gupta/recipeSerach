import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageRoutes from './routes/PageRoutes';
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";



function App() {
  return (
    <main>
    <Header/>
    <PageRoutes/>
    {/* <Footer/> */}
    </main>
  );
}

export default App;
