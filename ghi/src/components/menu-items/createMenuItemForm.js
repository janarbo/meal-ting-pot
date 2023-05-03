import { useState} from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCreateMenuItemMutation } from "../../features/menu-items/menuItemApi";
import { useUpdateProfileMutation, useGetOneChefProfileQuery, useGetAllTagsQuery } from "../../features/chef-profile/chefProfileApi";
import { useParams } from "react-router-dom";
import SideBar from '../../SideBar';
import Footer from "../../Footer"
import Lottie from "lottie-react";
import cookingLoader from "../../images/styling/cookingLoader.json";


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
            <Lottie animationData={cookingLoader}/>
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
    <div className="flex flex-col md:flex-row min-h-screen justify-center">
        <SideBar />
        <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-6">Update a Menu Item</h2>
        <form>
            <div className="mb-6">
            <label
                className="text-gray-700 font-bold mb-2 block"
                htmlFor="food_type"
            >
                Food Type:
            </label>
            <select
                className="select select-bordered w-full max-w-xs p-2.5"
                type="text"
                id="food_type"
                name="food_type"
                value={formData.food_type}
                onChange={handleFormChange}
            >
                {foodTypeOptions.map((food_type) => {
                return (
                    <option key={food_type} value={food_type}>
                    {food_type}
                    </option>
                );
                })}
            </select>
            </div>
            <div className="mb-6">
            <label
                className="text-gray-700 font-bold mb-2 block"
                htmlFor="name"
            >
                Name:
            </label>
            <input
                className="input input-bordered w-full max-w-xs p-2.5"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
            />
            </div>
            <div className="mb-6">
            <label
                className="text-gray-700 font-bold mb-2 block"
                htmlFor="price"
            >
                Price:
            </label>
            <input
                className="input input-bordered w-full max-w-xs p-2.5"
                type="int"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
            />
            </div>
            <div className="mb-6">
            <label
                htmlFor="description"
                className="text-gray-700 font-bold mb-2 block"
            >
                Description:
            </label>
            <textarea
                className="input input-bordered w-full max-w-xs p-2.5"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
            />
            </div>
            <div className="mb-6">
            <label
                className="text-gray-700 font-bold mb-2 block"
                htmlFor="comment"
            >
                Comment:
            </label>
            <textarea
                className="input input-bordered w-full max-w-xs p-2.5"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleFormChange}
            />
            </div>
            <div className="mb-6">
            <label
                className="text-gray-700 font-bold mb-2 block"
                htmlFor="photo"
            >
                Photo Link:
            </label>
            <input
                className="input input-bordered w-full max-w-xs p-2.5"
                type="text"
                name= "photo"
                id="photo"
                value={formData.photo}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                    className="text-gray-700 font-bold block mb-2 block"
                    htmlFor="spicy_level"
                >Spicy Level:</label>
                <select
                    className="select select-bordered w-full max-w-xs p-2.5"
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
                className="text-gray-700 font-bold block mb-2 block"
                htmlFor="tags"
                >Tags:</label>
                <input
                className="input input-bordered w-full max-w-xs p-2.5"
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                className="text-gray-700 font-bold block mb-2 block"
                htmlFor="calories"
                >Calories:</label>
                <input
                className="input input-bordered w-full max-w-xs p-2.5"
                type="int"
                name="calories"
                id="calories"
                value={formData.calories}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <label
                className="text-gray-700 font-bold block mb-2 block"
                htmlFor="ingredients"
                >Ingredients:</label>
                <input
                className="input input-bordered w-full max-w-xs p-2.5"
                type="text"
                name="ingredients"
                id="ingredients"
                value={formData.ingredients}
                onChange={handleFormChange}/>
                </div>
                <div className="mb-6">
                <button
                    className="btn btn-accent"
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                >
                    Share The Noms!
                </button>
                </div>
            </form>
            </div>
            </div>
            <div>
                <Footer />
            </div>
        </section>
)

}
export default CreateMenuItemForm
