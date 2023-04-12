import { useState } from 'react';
import { useGetAllChefQuery } from './features/menu-items/menuItemApi'
import ErrorNotification from './ErrorNotification';
import { useSelector } from "react-redux";

function GetAllChefMenuList() {
    const userId = useSelector((state) => state.auth.user.id);
    const { data } = useGetAllChefQuery(userId);
    console.log(data);
    return (
        <div>
            {data ? (
                <div>
                {data.map(menu_item => (
                    <div key={menu_item.menu_item_id}>{menu_item.name}</div>
                ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default GetAllChefMenuList;