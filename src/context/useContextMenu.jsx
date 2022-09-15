import { createContext, useState, useContext } from 'react';
import swal from 'sweetalert';

const MenuContext = createContext([]);

export const useContextMenu = () => useContext(MenuContext);

const MenuContextProvider = ({ children }) => {

    //Estado con la lista de los platos que se agregan al menu
    const [dishList, setDishList] = useState([]);
    const [veganCount, setVeganCount] = useState(0);
    const [notVeganCount, setNotVeganCount] = useState(0);

    //Agrega platos al menu
    function addDishMenu(dish) {
        const dishListNoDuplicates = [...dishList];
        if (dishListNoDuplicates.find((p) => p.id === dish.id) !== undefined) {
            setDishList(dishListNoDuplicates);
        } else {
            if ( dishList.length >= 4){
                swal("Oops!", "You cannot add more than four dishes to the menu", "error");
            } else {
                if(dish.vegan === true && veganCount<2) {
                    setVeganCount(veganCount+1);
                    setDishList([...dishList, { ...dish }])
                    swal("Good!", "Dish added to the menu", "success"); 
                } else if(dish.vegan === false && notVeganCount<2) {
                    setNotVeganCount(notVeganCount+1);
                    setDishList([...dishList, { ...dish }]);
                    swal("Good!", "Dish added to the menu", "success"); 
                } else {  
                    swal("Oops!", "You can only add 2 non-vegan dishes and 2 vegan dishes", "error");              
                }
            }
        }
    }

    //Promedio de precio 
    const averageHealtScore = () => {
        const suma = dishList.reduce((total, item) => total + item.healthScore, 0);
        return (suma/dishList.length).toFixed(2);
    }

    //Promedio de tiempo de preparación
    const averageReadyIn = () => {
        const suma = dishList.reduce((total, item) => total + item.readyInMinutes, 0);
        return suma/dishList.length;
    }

    //Devuelve el precio total del menu
    const priceTotal = () => (dishList.reduce((total, item) => total + item.pricePerServing, 0)).toFixed(2);

    //Remueve platos individuales
    const removeDishItem = (dish) => {
        
        const dishListDeleteItem = dishList.filter((p) => p.id !== dish.id);
        setDishList([...dishListDeleteItem]);
        if(dish.vegan) {
            setVeganCount(veganCount-1);
        } else {
            setNotVeganCount(notVeganCount-1);
        }
        swal("Good!", "Dish removed from the menu correctly", "success");
    };

    //Borra todos los platos del menu
    const clearDishMenu = () => {
        setDishList([]);
        setVeganCount(0);
        setNotVeganCount(0);
        swal("Good!", "Menu removed successfully", "success");
    };


    return (
        <MenuContext.Provider
            value={{
                dishList,
                addDishMenu,
                removeDishItem,
                clearDishMenu,
                averageReadyIn,
                priceTotal,
                averageHealtScore,
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;