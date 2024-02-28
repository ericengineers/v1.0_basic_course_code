import { useCallback, useState, createContext, useReducer, useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Outlet,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Cookies from 'js-cookie';

import Menu from './components/Menu'
import Home from './pages/Home'
import Mine from './pages/Mine'
import Reg from './pages/Reg'
import { navContext } from './context/nav'
import Login from './pages/Login';
import './App.css';
// Import Swiper styles
import 'swiper/css';
import { getUserDetail, userDetail } from './server';
import UserHome from './pages/UserHome';
import UserEdit from './pages/UserEdit';


function App() {
  const reducer = (state, action) => {
    // 
    if (action.type === 'user') {
      return {
        ...state,
        user: action.user
      }
    }
    if (action.type === 'account') {
      return {
        ...state,
        account: action.account
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, { user: {} })


  // 自动拉用户信息并存放在context中
  useEffect(() => {

    const aid = Cookies.get('aid');
    const aidToken = Cookies.get('aidToken');
    const uid = Cookies.get('uid');
    const uidToken = Cookies.get('uidToken')

    if (aid && uid && aidToken && uidToken) {
      updateUserInfo(uid)
    } else {
      if (window.location.href.indexOf('/login') < 0) {
        window.location.href = '/login'
      }

    }
    window.addEventListener('userRefresh', () => {
      updateUserInfo(uid)
    })

  }, [])

  const updateUserInfo = (uid) => {
    getUserDetail(uid).then(res => {

      dispatch({ type: 'user', user: res })
      dispatch({ type: 'account', account: {} })

    })
  }



  return (
    <div className="App">

      <navContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <div className='page-container'>
                  <Menu></Menu>
                  <div className='content-container'><Outlet></Outlet></div>
                </div>
              }
            >
              <Route path="/" element={<Home></Home>} />
              <Route path="/mine" element={<Mine></Mine>} />
              <Route path="/reg" element={<Reg></Reg>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/user/home/:uid" element={<UserHome></UserHome>} />
              <Route path="/user/edit" element={<UserEdit></UserEdit>} />
            </Route>
          </Routes>

        </BrowserRouter>
      </navContext.Provider>

    </div>
  );
}

export default App;
