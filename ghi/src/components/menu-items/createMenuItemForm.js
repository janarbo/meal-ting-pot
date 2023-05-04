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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import chefCooking from "../../images/styling/chefCooking.json";


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
    const canSubmit= [formData.food_type, formData.name, formData.price, formData.description, formData.photo, formData.spicy_level, formData.calories, formData.ingredients ].every(Boolean) && !isLoading
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
                toast.error(`Failed to create. Please verify your price and calories are valid numbers`)
            }
        }
    }
    const foodTypeOptions=['main', 'side', 'dessert']
    const spicyLevelOptions=[0,1,2,3,4,5]

    return(

<>
       <div className="min-h-screen font-sans">
       <div style={{ display: "flex", justifyContent: "center", marginBotton:"600px" }}>
        <div style={{ marginTop: "200px", marginLeft: "10px", flex: 7,  width: "100%"}} className='w=full'>
           <SideBar />
         </div>
        <div style={{ flex: 2 }}></div>

        <div  data-theme="garden" className="bg-white flex items-center justify-center " style={{marginRight:"200px", marginBotton:"500px"}}>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="w-1/3 flex items-center justify-center"  style={{marginBottom: "-20px"}}>
            <Lottie animationData={chefCooking} />
          </div>
            <div className="bg-[#edf8f3] overflow-hidden shadow rounded-lg flex-wrap w-full max-w-lg">

        <form className="divide-y divide-gray-200 lg:col-span-9 w-full max-w-lg p-6">
            <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">Create a New Menu Item</h2>
            </div>
            <div className="mt-6 flex flex-col lg:flex-row">
                  <div className="flex-grow space-y-6">
            <div>
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="food_type"
            >
                Food Type:
            </label>
            <select
                className="block w-full py-2 px-3 border border-green-500 bg-base-100 rounded-md shadow-sm focus:outline-none focus:ring-green-300 focus:border-green-300  sm:text-sm"
                type="text"
                id="food_type"
                name="food_type"
                value={formData.food_type}
                onChange={handleFormChange}
            >
                <option value=''>Choose a Food Type</option>
                {foodTypeOptions.map((food_type) => {
                return (
                    <option key={food_type} value={food_type}>
                    {food_type}
                    </option>
                );
                })}
            </select>
            </div>
            <div>
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
            >
                Name:
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
            <input
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
            />
            </div>
            </div>
            <div>
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="price"
            >
                Price:
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
            <input
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:int-sm border-green-500"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
            />
            </div>
            </div>
            <div>
            <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
            >
                Description:
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
            <textarea
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
            />
            </div>
            </div>
            <div className="mb-6">
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="comment"
            >
                Comment:
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
            <textarea
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleFormChange}
            />
            </div>
            </div>
            <div className="mb-6">
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="photo"
            >
                Photo Link:
            </label>
            <div className="mt-1 rounded-md shadow-sm flex">
            <input
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                type="text"
                name= "photo"
                id="photo"
                value={formData.photo}
                onChange={handleFormChange}/>
                </div>
                </div>
                <div>
                <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="spicy_level"
                >Spicy Level:</label>
                <select
                    className="block w-full py-2 px-3 border border-green-500 bg-base-100 rounded-md shadow-sm focus:outline-none focus:ring-green-300 focus:border-green-300  sm:text-sm"
                    type="number"
                    id="spicy_level"
                    name="spicy_level"
                    value={formData.spicy_level}
                    onChange={handleFormChange}
                >
                <option value=''>Choose a Spicy Level</option>
                {spicyLevelOptions.map(spicy_level=>{
                    return(
                        <option key={spicy_level} value={spicy_level}>{spicy_level}</option>
                    )
                })}
                </select>
                </div>
                <div>
                <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="tags"
                >Tags:</label>
                <div className="mt-1 rounded-md shadow-sm flex">
                <input
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleFormChange}/>
                </div>
                </div>
                <div>
                <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="calories"
                >Calories:</label>
                <div className="mt-1 rounded-md shadow-sm flex">
                <input
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                type="number"
                name="calories"
                id="calories"
                value={formData.calories}
                onChange={handleFormChange}/>
                </div>
                </div>
                <div>
                <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="ingredients"
                >Ingredients:</label>
                <div className="mt-1 rounded-md shadow-sm flex">
                <input
                className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                type="text"
                name="ingredients"
                id="ingredients"
                value={formData.ingredients}
                onChange={handleFormChange}/>
                </div>
                </div>
                <div className="mb-6 ">
                <button
                    className="btn border-none bg-[#60af71]"
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                >
                    Share the Noms!
                </button>
                </div>
                </div>
                </div>
            </form>
            <ToastContainer position="bottom-right"/>
            </div>
            </div>
                </div>
            </div>
            </div>
            <div>
                <Footer />
            </div>

</>
)

}
export default CreateMenuItemForm
