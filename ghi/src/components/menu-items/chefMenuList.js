import { useGetAllChefQuery, useUpdateMenuItemMutation  } from '../../features/menu-items/menuItemApi'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SideBar from '../../SideBar';
import Footer from "../../Footer";
import Lottie from "lottie-react";
import cookingLoader from "../../images/styling/cookingLoader.json";
import chefCooking from "../../images/styling/chefCooking.json";



function GetAllChefMenuList() {
    const userId = useSelector((state) => state.auth.userInfo.id);
    const { profileId } = useParams();
    const [updateMenuItemStatus, {isLoading}]=useUpdateMenuItemMutation()
    const { data: menuItems, isLoading: isLoadingMenuItems } = useGetAllChefQuery(userId);
    const navigate=useNavigate()
    const canSave=!isLoading
    if(isLoading||isLoadingMenuItems){
        return <Lottie animationData={cookingLoader}/>
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

        navigate(`/chef/${profileId}/menu-items/edit/${menu_item.menu_item_id}/`)
    }
    const createMenuItemClicked=()=>{
        navigate(`/chef/${profileId}/menu-items/new/`)
    }
    return (
<div className="flex flex-col h-screen relative font-sans">
    <div className="flex flex-grow">
        <SideBar />
        <div className="flex-grow p-6 relative z-10">
        <h1 className="text-3xl font-bold mb-4">Your Menu Items</h1>
    <div className="flex mb-4 items-center">
        <button className="btn bg-[#60af71] border-none" onClick={() => createMenuItemClicked()}>
            Add a New Menu Item
        </button>
        <Lottie className="w-full h-48 ml-10" animationData={chefCooking}/>
    </div>
        <div className="overflow-x-auto">
            <table className="table w-full table-zebra table-bordered">
            <thead>
                <tr>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Food Type</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Photo</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Name</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Price</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Description</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Status</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Change Status</th>
                    <th className="text-center bg-gray-100 py-2 px-4 border">Update Menu Item</th>
                </tr>
            </thead>
            {menuItems ? (
                <tbody>
                {menuItems.map((menu_item, index) => (
                    <tr key={menu_item.menu_item_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="text-center">{menu_item.food_type}</td>
                        <td>
                            <img className="mask mask-squircle w-20 h-20" src={menu_item.photo} alt={menu_item.photo} />
                        </td>
                        <td className="text-center">{menu_item.name}</td>
                        <td className="text-center">${menu_item.price}</td>
                        <td className="text-center whitespace-normal break-words">{menu_item.description}</td>
                        {menu_item.status ? (
                            <td className="text-center">Available</td>
                        ) : (
                            <td className="text-center">Not Available</td>
                        )}
                        {menu_item.status ? (
                            <td className="text-center">
                            <button
                                className="btn btn-error btn-xs sm:btn-sm md:btn-md lg"
                                onClick={() => updateMenuItemStatusClicked(menu_item)}
                            >
                                Make Unavailable
                            </button>
                            </td>
                        ) : (
                            <td className="text-center">
                            <button
                                className="btn btn-success btn-xs sm:btn-sm md:btn-md lg"
                                onClick={() => updateMenuItemStatusClicked(menu_item)}
                            >
                                Make Available
                            </button>
                            </td>
                        )}
                        <td className="text-center">
                            <button
                            className="btn btn-warning btn-xs sm:btn-sm md:btn-md lg"
                            onClick={() => updateMenuItemClicked(menu_item)}
                            >
                            Update!
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        ) : (
        <tbody>
            <tr>
            <td>{cookingLoader}</td>
            </tr>
        </tbody>
        )}
    </table>
    </div>
    </div>
    </div>
    <Footer />
</div>


    )};


export default GetAllChefMenuList;
