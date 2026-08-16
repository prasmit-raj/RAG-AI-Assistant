import Dashboard from "../dashboard/dashboard.jsx";
import {Route, Routes} from "react-router-dom";

function RouteComponent() {
    return (
        <Routes>
    <Route path="/" element={<Dashboard />} />
</Routes>
    );
}

export default RouteComponent;