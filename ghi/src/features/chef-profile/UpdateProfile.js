import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useUpdateProfileMutation,
  useGetAllTagsQuery,
  useGetOneProfileQuery,
} from './chefProfileApi';
import { useGetAllChefQuery } from '../menu-items/menuItemApi';
import { useSelector } from "react-redux";
import SideBar from '../../SideBar';



function UpdateProfileForm() {
  const { profileId } = useParams();
  const userId = useSelector((state) => state.auth.userInfo.id);
  const { data: profile } = useGetOneProfileQuery(parseInt(profileId));
  const { data: tags } = useGetAllTagsQuery();
  const { data: menuItems } = useGetAllChefQuery(userId);
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

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
    if (profile) {
      setFullName(profile.full_name);
      setEmail(profile.email);
      setPhoto(profile.photo);
      setPhoneNumber(profile.phone_number);
      setAddress(profile.address);
      setBio(profile.bio);
      setAvailability(profile.availability);
      setFeaturedMenuItem(profile.featured_menu_item);
      setTagName(profile.tags);
    }
  }, [profile]);

  const handleOnClick = () => {
    setAvailability(!availability);
  };
  const canSave = !isLoading
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
    try {
        await updateProfile({
        profile_id: parseInt(profileId),
        full_name: fullName,
        email: email,
        photo:  photo,
        phone_number: phoneNumber,
        address:  address,
        bio:  bio,
        availability:  availability,
        tags: tagName,
        featured_menu_item: featuredMenuItem,
      }).unwrap()
        navigate(`/chef/profile/${profileId}`);
      } catch(error) {
      console.log(error);
    }
    }
  };


   if (isLoading){
      return <div>Updating...</div>;

   }

  return (
    <div className="flex items-center justify-center h-screen">
      <SideBar />
     <div className="bg-white overflow-hidden shadow rounded-lg w-1/2">
      <form onSubmit={handleSubmit} className="divide-y divide-gray-200 lg:col-span-9">
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">Edit Profile</h2>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <div className="relative flex-grow focus-within:z-10">
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      autoComplete="name"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
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
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
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
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
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
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
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
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  value={bio}
                  onChange={e => setBio(e.target.value)}

                ></textarea>
              </div>
          </div>

          <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="availability"
            name="availability"
            value={availability}
            onChange={handleOnClick}
            className="checkbox checkbox-primary"
          />
          <label htmlFor="availability" className="ml-2 block text-sm text-gray-900">
            Availability
          </label>
        </div>

        <select
          label='tags'
          id='tags'
          value='tags'
        onChange={(e) => setTagName(e.target.value)}
        className="block w-full py-2 px-3 border border-gray-300 bg-base-100 rounded-md shadow-sm focus:outline-none focus:ring-base-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value=''>Tag</option>
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
              className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={e => setFeaturedMenuItem(e.target.value)} >

                <option value=''>Signature Dish</option>
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
              <button type="submit" className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
       </div>
        </div>
    </div>
      </form>
      </div>
  </div>


  );

}

export default UpdateProfileForm;
