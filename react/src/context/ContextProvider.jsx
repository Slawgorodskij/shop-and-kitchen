import {createContext, useContext, useState} from "react";
import {listPages} from "../listPages.js";
const StateContext = createContext({
  user: null,
  token: null,
  deyWeek: null,
  mealTime: null,
  setUser: () => { },
  setToken: () => { },
  setDeyWeek: () => { },
  setMealTime: () => { },
  listPages: listPages,
})
export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [list] = useState(listPages);

  const [deyWeek, setDeyWeek] = useState([]);
  const [mealTime, setMealTime] = useState([]);

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      list,
      deyWeek,
      setDeyWeek,
      mealTime,
      setMealTime,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
