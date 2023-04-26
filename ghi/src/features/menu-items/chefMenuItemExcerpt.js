import {Link} from 'react-router-dom'
import { useGetAllChefQuery, useDeleteMenuItemMutation } from './menuItemApi'
import { useSelector } from 'react-redux';

const MenuItemsExcerpt=({menuItemId})=> {
    const Id=useSelector( (state)=> state.auth.userInfo.id)
    const{menuItem}= useGetAllChefQuery(Id,{
        selectFromResult:({data})=>({
            menuItem: data?.entities[menuItemId]
        }),
    })

    return(
        <div>
            <h2>{menuItem}</h2>
        </div>
    )
}
export default MenuItemsExcerpt
