import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import * as url from '../helpers/url';

const ProtectedRoute = ({children})=>{
    const {loading, auth} = useSelector((state)=>state.authReducer);
    if(loading === false){
        if(!auth){
            return <Navigate to={url.login()} replace />;
        }
        return children;
    }
};

export default ProtectedRoute;