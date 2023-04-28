import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useGetOneMenuItemQuery } from '../../features/menu-items/menuItemApi'
import { useUpdateMenuItemMutation } from '../../features/menu-items/menuItemApi'
import { useSelector } from 'react-redux'
import SideBar from '../../SideBar';
import Footer from "../../Footer"

const UpdateMenuItemForm = () => {
    const chefId = useSelector((state)  => state.auth.userInfo.id);
    const{ profileId, menuItemId} = useParams()
    const navigate=useNavigate()
    const [updateMenuItem, {isLoading}]= useUpdateMenuItemMutation()
    const {data: menuItem, isLoading: isLoadingMenuItem, isSuccess}= useGetOneMenuItemQuery(menuItemId)
    const[formData, setFormData]= useState({
        menu_item_id: parseInt(menuItemId),
        food_type: '',
        name: '',
        price:'',
        description: '',
        comment: '',
        photo: '',
        spicy_level: '',
        tags: '',
        calories: '',
        ingredients: '',
        status: '',
        chef_id: chefId
    })
    useEffect(()=>{
        if (isSuccess){
            setFormData({menu_item_id: parseInt(menuItemId), food_type: menuItem.food_type, name: menuItem.name, price: menuItem.price, description:menuItem.description, comment: menuItem.comment, photo: menuItem.photo, spicy_level: menuItem.spicy_level, tags: menuItem.tags, calories: menuItem.calories, ingredients: menuItem.ingredients, status: menuItem.status
            })
        }
    },[isSuccess, menuItem?.foodtype, menuItem?.name, menuItem?.price, menuItem?.food_type, menuItemId ,menuItem?.description,menuItem?.comment, menuItem?.photo, menuItem?.spicy_level, menuItem?.tags,  menuItem?.calories,  menuItem?.ingredients, menuItem?.status])

    if (isLoadingMenuItem) return <p>Loading...</p>

    const handleFormChange=(e)=>{
        const value= e.target.value;
        const inputName=e.target.name;
        setFormData({
            ...formData,
            [inputName]:value
        })
    }
    const canSave=!isLoading
    const onSaveMenuItemClicked=async()=>{
        if (canSave){
            try {

                await updateMenuItem(formData).unwrap()
                navigate(`/chef/${profileId}/menu-items`)
            } catch(e){
                console.error('Failed to save the menu item', e)
            }
        }
    }
    const foodTypeOptions=['main', 'side', 'dessert']
    const spicyLevelOptions=[0,1,2,3,4,5]
    return(

        <section>
            <div>
                <SideBar/>
            </div>
            <div className="flex items-center justify-center h-screen">
            <div className="bg-white overflow-hidden shadow rounded-lg w-1/2">
            <div className="m-6">
            <h2>Update a Menu Item</h2>
            </div>
            <div className="m-6">
            <form>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2" htmlFor="food_type"
                >Food Type:</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    id="food_type"
                    name="food_type"
                    value={formData.food_type}
                    onChange={handleFormChange}
                >
                {foodTypeOptions.map(food_type=>{
                    return(
                        <option key={food_type} value={food_type}>{food_type}</option>
                    )
                })}
                </select>
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2"
                htmlFor="name"
                >Name:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="name"
                name= "name"
                value={formData.name}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2"
                htmlFor="price"
                >Price:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="int"
                id="price"
                name= "price"
                value={formData.price}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                htmlFor="description"
                className="text-sm font-medium text-gray-900 block mb-2"
                >Description:</label>
                <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                />
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2" htmlFor="comment"
                >Comment:</label>
                <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                />
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2"
                htmlFor="photo"
                >Photo Link:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name= "photo"
                id="photo"
                value={formData.photo}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                    className="text-sm font-medium text-gray-900 block mb-2"
                    htmlFor="spicy_level"
                >Spicy Level:</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="int"
                    id="spicy_level"
                    name="spicy_level"
                    value={formData.spicy_level}
                    onChange={handleFormChange}
                >
                {spicyLevelOptions.map(spicy_level=>{
                    return(
                        <option key={spicy_level} value={spicy_level}>{spicy_level}</option>
                    )
                })}
                </select>
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2"
                htmlFor="tags"
                >Tags:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2"
                htmlFor="calories"
                >Calories:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="int"
                name="calories"
                id="calories"
                value={formData.calories}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                className="text-sm font-medium text-gray-900 block mb-2"
                htmlFor="ingredients"
                >Ingredients:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="ingredients"
                id="ingredients"
                value={formData.ingredients}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={onSaveMenuItemClicked}
                    disabled={!canSave}
                >
                    Save Menu Item
                </button>
                </div>
            </form>
            </div>
            </div>
            </div>
            <div>
                <Footer />
            </div>
        </section>
    )
}
export default UpdateMenuItemForm
