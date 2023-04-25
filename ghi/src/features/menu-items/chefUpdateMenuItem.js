import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useGetOneMenuItemQuery } from './menuItemApi'
import { useUpdateMenuItemMutation } from './menuItemApi'
import { useSelector } from 'react-redux'

const UpdateMenuItemForm = () => {
    const chefId = useSelector((state)  => state.auth.userInfo.id);
    const{menuItemId} = useParams()
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
    },[isSuccess, menuItem?.foodtype, menuItem?.name, menuItem?.price, menuItem?.description,menuItem?.comment, menuItem?.photo, menuItem?.spicy_level, menuItem?.tags,  menuItem?.calories,  menuItem?.ingredients, menuItem?.status])
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
                navigate(`/chef/menu-items`)
            } catch(e){
                console.error('Failed to save the menu item', e)
            }
        }
    }
    const foodTypeOptions=['main', 'side', 'dessert']
    const spicyLevelOptions=[0,1,2,3,4,5]
    return(
        <section>
            <h2>Update a Menu Item</h2>
            <form>
                <label htmlFor="food_type">Food Type:</label>
                <select
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
                    onClick={onSaveMenuItemClicked}
                    disabled={!canSave}
                >
                    Save Menu Item
                </button>
            </form>
        </section>
    )
}
export default UpdateMenuItemForm
