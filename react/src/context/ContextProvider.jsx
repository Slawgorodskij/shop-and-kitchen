import {createContext, useContext, useState} from "react";
import {listPages} from "../listPages.js";
const StateContext = createContext({
  user: null,
  token: null,
  deyWeek: null,
  mealTime: null,
  mealTimeAndRecipe: null,
  setUser: () => { },
  setToken: () => { },
  setDeyWeek: () => { },
  setMealTime: () => { },
  setMealTimeAndRecipe: () => { },
  listPages: listPages,
})
export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [list] = useState(listPages);

  const [deyWeek, setDeyWeek] = useState([]);
  const [mealTime, setMealTime] = useState([]);
  const [mealTimeAndRecipe, setMealTimeAndRecipe] = useState([]);

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
      mealTimeAndRecipe,
      setMealTimeAndRecipe
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
