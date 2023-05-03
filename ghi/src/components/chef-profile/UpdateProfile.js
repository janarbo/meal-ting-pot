import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useUpdateProfileMutation,
  useGetAllTagsQuery,
  useGetOneProfileQuery,
} from '../../features/chef-profile/chefProfileApi';
import { useGetAllChefQuery } from '../../features/menu-items/menuItemApi';
import { useSelector } from "react-redux";
import SideBar from '../../SideBar';
import Lottie from "lottie-react";
import chefCooking from "../../images/styling/chefCooking.json";




function UpdateProfileForm() {
  const { profileId } = useParams();
  const userId = useSelector((state) => state.auth.userInfo.id);
  const { data: profile, isLoading: profileLoading, isSuccess: profileSuccess } = useGetOneProfileQuery(parseInt(profileId));
  const { data: tags, isLoading: tagsLoading, isSuccess: tagsSuccess } = useGetAllTagsQuery();
  const { data: menuItems, isLoading: menuItemsLoading, isSuccess: menuItemsSuccess } = useGetAllChefQuery(userId);
  const navigate = useNavigate();

  const [updateProfile] = useUpdateProfileMutation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState(false);
  const [featuredMenuItem, setFeaturedMenuItem] = useState('');
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (profileSuccess && tagsSuccess && menuItemsSuccess) {
      setFullName(profile.full_name);
      setEmail(profile.email);
      setPhoto(profile.photo);
      setPhoneNumber(profile.phone_number);
      setAddress(profile.address);
      setBio(profile.bio);
      setAvailability(profile.availability);
      if (profile.featured_menu_item !== null) {
        for (let menuItem of menuItems) {
          if (profile.featured_menu_item === menuItem.name) {
            setFeaturedMenuItem(menuItem.menu_item_id);
          }
        }
      }
      if (profile.tags !== null) {
        for (let tag of tags) {
          if (profile.tags === tag.name) {
            setTagName(tag.id);
          }
        }
      }
    }
  }, [profileSuccess, tagsSuccess, menuItemsSuccess, menuItems, profile, tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let input = {
        profile_id: parseInt(profileId),
        full_name: fullName,
        email: email,
        photo:  photo,
        phone_number: phoneNumber,
        address:  address,
        bio:  bio,
        availability:  availability,
        tags: parseInt(tagName),
        featured_menu_item: featuredMenuItem
      }

      if (featuredMenuItem === "") {
        input.featured_menu_item = null;
      }

        await updateProfile(input).unwrap()
        navigate(`/chef/profile/${profileId}`);
      } catch(error) {
      console.log(error);
    }
  };

   if (profileLoading || tagsLoading || menuItemsLoading){
      return  <Lottie animationData={chefCooking}/>
   }


  return (
       <>
       <div style={{ display: "flex", justifyContent: "center", marginBotton:"600px" }}>
        <div style={{ marginTop: "200px", marginLeft: "10px", flex: 3,  width: "100%"}} className='w=full'>
           <SideBar />
         </div>
        <div style={{ flex: 2 }}></div>

        <div  data-theme="garden" className="bg-white flex items-center justify-center h-full" style={{marginRight:"200px", marginBotton:"1000px"}}>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="w-1/3 flex items-center justify-center"  style={{marginBottom: "-20px"}}>
            <Lottie animationData={chefCooking} />
          </div>
            <div className="bg-[#ecfaf4] overflow-hidden shadow rounded-lg flex-wrap w-full max-w-lg">
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200 lg:col-span-9 w-full max-w-lg p-6"
              >
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
                    Update My Profile
                  </h2>
                </div>
              <div className="mt-6 flex flex-col lg:flex-row">
                  <div className="flex-grow space-y-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="mt-1 rounded-md shadow-sm flex">
                        <div className="relative flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          autoComplete="name"
                          className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                      />
                      </div>
                    </div>
                  </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 rounded-md shadow-sm flex">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 rounded-md shadow-sm flex">
                        <input
                          type="text"
                          name="photo"
                          label='photo'
                          id='photo'
                          autoComplete="photo"
                          className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                          value={photo}
                          onChange={e => setPhoto(e.target.value)}
                        />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 rounded-md shadow-sm flex">
                        <input
                          type="text"
                          name="phoneNumber"
                          label='phoneNumber'
                          id='phoneNumber'
                          autoComplete="phoneNumber"
                          className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="address"
                        className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                        value={address}
                        onChange={e => setAddress(e.target.value)}

                      />
                    </div>
                  </div>

                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="bio"
                      name="bio"
                      rows="3"
                      className="focus:ring-green-300 focus:border-green-300 block w-full min-w-0 rounded-l-md sm:text-sm border-green-500"
                      value={bio}
                      onChange={e => setBio(e.target.value)}

                    ></textarea>
                  </div>
              </div>

            <select
              label='tags'
              id='tags'
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="block w-full py-2 px-3 border border-green-500 bg-base-100 rounded-md shadow-sm focus:outline-none focus:ring-green-300 focus:border-green-300  sm:text-sm"
              >
              {tagName === "" && (
                <option value=''>Tag</option>
              )}
              {tags?.map(tag => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                );
              })}
            </select>

              {menuItems ? (
                <select
                  label='Featured Menu Item'
                  id='featuredMenuItem'
                  value={featuredMenuItem}
                  className="block w-full py-2 px-3 border border-green-500 bg-base-100 rounded-md shadow-sm focus:outline-none focus:ring-green-300 focus:border-green-300  sm:text-sm"
                  onChange={e => setFeaturedMenuItem(e.target.value)} >

                    {featuredMenuItem === "" && (
                      <option value="">Signature Dish</option>
                    )}

                    {menuItems?.map(menuItem=> {
                        return(
                          <option key={menuItem.menu_item_id} value={menuItem.menu_item_id}>
                            {menuItem.name}
                          </option>
                        );
                    })}

                </select>
              ) : (
                  <button onClick={() => navigate(`/chef/${profileId}/menu-items/new`)} className="text-gray-800 hover:bg-[#b05e5e] w-full py-2 px-2 border rounded mb-1 hover:bg-gray-100">
                    Please create a Menu Item
                  </button>
              )}
                  <button
                  type="submit"
                  className=" w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#49cc90] hover:bg-[#84dab2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Update</button>
                </div>
              </div>
          </form>
        </div>
  </div>
</div>
   </div>


</>

  );

}

export default UpdateProfileForm;
