import { useState} from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCreateMenuItemMutation } from "../../features/menu-items/menuItemApi";
import { useUpdateProfileMutation, useGetOneChefProfileQuery, useGetAllTagsQuery } from "../../features/chef-profile/chefProfileApi";
import { useParams } from "react-router-dom";
import SideBar from '../../SideBar';
import Footer from "../../Footer"


const CreateMenuItemForm=()=>{
    const chefId = useSelector((state)  => state.auth.userInfo.id);
    const { profileId } = useParams();

    const[createMenuItem, {isLoading}]= useCreateMenuItemMutation();
    const { data, isLoading: chefProfileLoading } = useGetOneChefProfileQuery(profileId);
    const { data: tags, isLoading: tagsLoading } = useGetAllTagsQuery();

    const [updateProfile] = useUpdateProfileMutation();

    const navigate= useNavigate()
    const [formData, setFormData]= useState({
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
        status: true,
        chef_id: chefId
    })

    if (chefProfileLoading || tagsLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const handleFormChange = (e) =>{
        const value = e.target.value;
        const inputName= e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
    }
    const canSubmit= !isLoading
    const onSubmit= async ()=> {
        if(canSubmit){
            try{
                const response = await createMenuItem(formData);
                if (data.featured_menu_item === null) {
                    let tagId = null
                    for (let tagObject of tags) {
                        if (data.tags === tagObject.name) {
                            tagId = tagObject.id
                        }
                    }

                    const profileUpdate = {
                        "address": data.address,
                        "availability": data.availability,
                        "bio": data.bio,
                        "photo": data.photo,
                        "featured_menu_item": response.data.menu_item_id.toString(),
                        "profile_id": data.profile_id,
                        "full_name": data.full_name,
                        "email": data.email,
                        "phone_number": data.phone_number,
                        "tags": tagId
                    }

                    await updateProfile(profileUpdate);
                }
                setFormData({});
                navigate(`/chef/${profileId}/menu-items/`)
            }catch(e){
                console.error('Failed to create', e)
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
            <h2>Create a New Menu Item</h2>
            </div>
            <div className="m-6">
            <form>
                <div className="mb-6">
                <label
                htmlFor="food_type"
                className="text-sm font-medium text-gray-900 block mb-2"
                >Food Type:</label>
                <select
                    type="text"
                    id="food_type"
                    name="food_type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.food_type}
                    onChange={handleFormChange}
                >
                <option value=''>Choose Food Type</option>
                {foodTypeOptions.map(food_type=>{
                    return(
                        <option key={food_type} value={food_type}>{food_type}</option>
                    )
                })}
                </select>
                </div>
                <div className="mb-6">
                <label htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2"
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
                htmlFor="price"
                className="text-sm font-medium text-gray-900 block mb-2"
                >Price:</label>
                <input
                type="int"
                id="price"
                name= "price"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.price}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                htmlFor="description"
                className="text-sm font-medium text-gray-900 block mb-2"
                >Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                </div>
                <div className="mb-6">
                <label
                htmlFor="comment"
                className="text-sm font-medium text-gray-900 block mb-2"
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
                htmlFor="photo"
                className="text-sm font-medium text-gray-900 block mb-2"
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
                htmlFor="spicy_level"
                className="text-sm font-medium text-gray-900 block mb-2"
                >Spicy Level:</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="int"
                    id="spicy_level"
                    name="spicy_level"
                    value={formData.spicy_level}
                    onChange={handleFormChange}
                >
                    <option value=''>Choose a Spice Level</option>
                {spicyLevelOptions.map(spicy_level=>{
                    return(
                        <option key={spicy_level} value={spicy_level}>{spicy_level}</option>
                    )
                })}
                </select>
                </div>
                <div className="mb-6">
                <label
                htmlFor="tags"
                className="text-sm font-medium text-gray-900 block mb-2"
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
                htmlFor="calories"
                className="text-sm font-medium text-gray-900 block mb-2"
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
                htmlFor="ingredients"
                className="text-sm font-medium text-gray-900 block mb-2"
                >Ingredients:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="ingredients"
                id="ingredients"
                value={formData.ingredients}
                onChange={handleFormChange}/>
                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                >Share the Noms!</button>
            </form>
            </div>
            </div>
            </div>
            <div>
                <Footer/>
            </div>
        </section>
)

}
export default CreateMenuItemForm
