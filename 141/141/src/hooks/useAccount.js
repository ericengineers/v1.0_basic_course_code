import Cookies from "js-cookie"

export default function useAccount() {


    const logout = () => {
        Cookies.remove('uid')
        Cookies.remove('uid-token')
        Cookies.remove('aid')
        Cookies.remove('aid-token')
        window.location.href = '/login'
    }

    return [logout]
}