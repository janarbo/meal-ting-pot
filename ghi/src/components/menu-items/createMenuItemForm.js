import { useState} from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCreateMenuItemMutation } from "../../features/menu-items/menuItemApi";
import { useGetOneChefProfileQuery } from "../../features/chef-profile/chefProfileApi";
import { useUpdateProfileMutation } from "../../features/chef-profile/chefProfileApi";
import { useParams } from "react-router-dom";
import SideBar from '../../SideBar';
import Footer from "../../Footer"

const CreateMenuItemForm=()=>{
    const chefId = useSelector((state)  => state.auth.userInfo.id);
    const { profileId } = useParams();

    const[createMenuItem, {isLoading}]= useCreateMenuItemMutation();
    const { data, isLoading: chefProfileLoading } = useGetOneChefProfileQuery(profileId);

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

    if (chefProfileLoading) {
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
                if (!data.featured_menu_item) {
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
                        "tags": data.tags,
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
            <h2>Create a New Menu Item</h2>
            <form>
                <label htmlFor="food_type">Food Type:</label>
                <select
                    type="text"
                    id="food_type"
                    name="food_type"
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
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name= "name" value={formData.name} onChange={handleFormChange}/>
                <label htmlFor="price">Price:</label>
                <input type="int" id="price" name= "price" value={formData.price} onChange={handleFormChange}/>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                />
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                />
                <label htmlFor="photo">photo:</label>
                <input type="text" name= "photo" id="photo" value={formData.photo} onChange={handleFormChange}/>
                <label htmlFor="spicy_level">Spicy Level:</label>
                <select
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
                <label htmlFor="tags">Tags:</label>
                <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleFormChange}/>
                <label htmlFor="calories">calories:</label>
                <input type="int" name="calories" id="calories" value={formData.calories} onChange={handleFormChange}/>
                <label htmlFor="ingredients">Ingredients:</label>
                <input type="text" name="ingredients" id="ingredients" value={formData.ingredients} onChange={handleFormChange}/>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                >Share the Noms!</button>
            </form>
            <div>
                <Footer/>
            </div>
        </section>
)

}
export default CreateMenuItemForm
