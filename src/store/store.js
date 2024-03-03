import {makeAutoObservable} from "mobx";
import { ProfileFetch } from "../requests/requestsMetods";

class AuthStore{
    AuthFlag=false

    constructor() {
        makeAutoObservable(this)
        const savedAuthFlag = localStorage.getItem('AuthFlag')
        if (savedAuthFlag !== null) {
            this.AuthFlag = JSON.parse(savedAuthFlag)
        }
    }

    setAuth(bool) {
        this.AuthFlag = bool
        localStorage.setItem('AuthFlag', JSON.stringify(bool))
    }

    async AuthChecking(){
        const response=await ProfileFetch(localStorage.getItem('token'))
        
        if(response.role){
            
            this.setAuth(true)
        }
    }
}

export default new AuthStore()