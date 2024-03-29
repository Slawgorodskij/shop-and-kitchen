import {createContext, useContext, useState} from "react";
import {listPages} from "../listPages.js";

const StateContext = createContext({
  user: null,
  token: null,
  DayWeek: null,
  mealTime: null,
  listNameRecipes: null,
  mealTimeAndRecipe: null,
  shoppingListRendering: null,
  storeroomListRendering: null,
  typeProduct: null,
  setUser: () => {
  },
  setToken: () => {
  },
  setDayWeek: () => {
  },
  setMealTime: () => {
  },
  setListNameRecipes: () => {
  },
  setMealTimeAndRecipe: () => {
  },
  setShoppingListRendering: () => {
  },
  setStoreroomListRendering: () => {
  },
  setTypeProduct: () => {
  },
  listPages: listPages,
})
export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [list] = useState(listPages);

  const [DayWeek, setDayWeek] = useState([]);
  const [mealTime, setMealTime] = useState([]);
  const [listNameRecipes, setListNameRecipes] = useState([]);
  const [mealTimeAndRecipe, setMealTimeAndRecipe] = useState([]);
  const [shoppingListRendering, setShoppingListRendering] = useState([]);
  const [storeroomListRendering, setStoreroomListRendering] = useState([]);
  const [typeProduct, setTypeProduct] = useState([]);



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
      DayWeek,
      setDayWeek,
      mealTime,
      setMealTime,
      listNameRecipes,
      setListNameRecipes,
      mealTimeAndRecipe,
      setMealTimeAndRecipe,
      shoppingListRendering,
      setShoppingListRendering,
      storeroomListRendering,
      setStoreroomListRendering,
      typeProduct,
      setTypeProduct,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
