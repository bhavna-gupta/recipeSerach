import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import routes from "./routes.json"
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
const PageRoutes = () => {
    return (
        <Routes>
            <Route path={routes.Home} element={<Home />} />
            <Route path="*" element={<ErrorPage />}/>
        </Routes>
    );
};

export default PageRoutes;