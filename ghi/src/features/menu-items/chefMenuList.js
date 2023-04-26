import { useGetAllChefQuery, useUpdateMenuItemMutation  } from './menuItemApi'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';




function GetAllChefMenuList() {
    const userId = useSelector((state) => state.auth.userInfo.id);
    const { profileId } = useParams();
    const [updateMenuItemStatus, {isLoading}]=useUpdateMenuItemMutation()
    const { data: menuItems, isLoading: isLoadingMenuItems } = useGetAllChefQuery(userId);
    const navigate=useNavigate()
    const canSave=!isLoading
    if(isLoading||isLoadingMenuItems){
        return <p>Loading...</p>
    }

    const updateMenuItemStatusClicked= async (menu_item)=>{
        if (canSave){
            try{
                await updateMenuItemStatus({
                    menu_item_id: menu_item.menu_item_id,
                    food_type: menu_item.food_type,
                    name: menu_item.name,
                    price: menu_item.price,
                    description:menu_item.description,
                    comment: menu_item.comment,
                    photo: menu_item.photo,
                    spicy_level: menu_item.spicy_level,
                    tags: menu_item.tags,
                    calories: menu_item.calories,
                    ingredients: menu_item.ingredients,
                    status: menu_item.status ? false: true
                }).unwrap();


            } catch(err){
                console.error('Status Update Failed', err)
            }
        }
    }
    const updateMenuItemClicked=(menu_item)=>{

        navigate(`/chef/menu-items/edit/${menu_item.menu_item_id}/`)
    }
    const createMenuItemClicked=()=>{
        navigate(`/chef/${profileId}/menu-items/new/`)
    }
    return (
<div>
    <h1>Your Menu Items</h1>
    <button className="btn btn-success" onClick={()=>createMenuItemClicked()}>Add a New Menu Item</button>
    <div className="row">
        <div className="col-sm">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Change Status</th>
                        <th>Update Menu Item</th>
                    </tr>
                </thead>
                {menuItems? (
                    <tbody>
                    {menuItems.map(menu_item => (
                        <tr key={menu_item.menu_item_id}>
                            <td><img  className="h-20 w-20 object-cover" src={menu_item.photo} alt="Menu Item Photo" /></td>
                            <td>{menu_item.name}</td>
                            <td>{menu_item.price}</td>
                            <td>{menu_item.description}</td>
                            {menu_item.status ? <td>Available</td> : <td>Not Available</td>}
                            <td>
                                <button className="btn btn-danger"
                                onClick={()=>updateMenuItemStatusClicked(menu_item)}>Change Status</button>
                            </td>
                            <td><button className="btn btn-success" onClick={()=>updateMenuItemClicked(menu_item)}>Update!</button></td>
                        </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    </div>
</div>
    )};


export default GetAllChefMenuList;
