import AuthStore from "../store/store"
import {Header} from '../components/header';
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {Navigate} from "react-router";
import { observer } from "mobx-react-lite";

export const AuthLayout=observer(({children})=>{
    // const navigate=useNavigate()

    const {data, isLoading, error}=useQuery(['AuthChecking'], () => AuthStore.AuthChecking(),{

    })
    
    if(error){
        
        return(
            <Navigate to={'/login'}/>
        )
    }
    if(AuthStore.AuthFlag===false){
        
        return(
            <Navigate to={'/login'}/>
        )
    }
    return(
        <>
            <Header/>
            {children}
        </>
    )
})