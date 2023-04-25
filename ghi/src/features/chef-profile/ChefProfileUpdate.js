import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation, useGetAllTagsQuery, useGetOneProfileQuery} from "./chefProfileApi";
import { useGetAllChefQuery } from '../menu-items/menuItemApi';




function ChefProfileUpdate() {
    // const profileId = singleProfile?.profileId;

    const navigate = useNavigate();
    const {data: singleProfile} = useGetOneProfileQuery();

    const {
        profileId,
        'full_name': initialFullName,
        'email': initialEmail,
        'photo': initialPhoto,
        'phone_number': initialPhoneNumber,
        'address': initialAddress,
        'bio': initialBio,
        'availability': initialAvailabilty,
        'tags': initialTags,
        'featuredMenuItem': initialFeaturedMenuItem

    } = singleProfile || {};

    const [fullName, setFullName] = useState(initialFullName || '');
    const [email, setEmail] = useState(initialEmail || '');
    const [photo, setPhoto] = useState(initialPhoto || '');
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
    const [address, setAddress] = useState(initialAddress || '');
    const [bio, setBio] = useState(initialBio || '');
    const [availability, setAvailability] = useState( false);
    const [featuredMenuItem, setFeaturedMenuItem] = useState('');
    const [tagName, setTagName] = useState('');

    const { data: menuItems } = useGetAllChefQuery();
    const { data: tags } = useGetAllTagsQuery();
    const [editProfile] = useUpdateProfileMutation();


    const handleOnClick = () => {
        availability ? setAvailability(false): setAvailability(true);
    }


    const profileUpdateSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('full_name', fullName)
        formData.append('email', email)
        formData.append('photo', photo)
        formData.append('phone_number',phoneNumber)
        formData.append('address', address)
        formData.append('bio', bio)
        formData.append('availability', availability)
        formData.append('tags', tagName)
        formData.append('featured_menu_item', featuredMenuItem)

        editProfile({ profile_id: profileId, data: formData });

        console.log(profileId)


         navigate(`/chef/profile/${profileId}`)



    }




    return(
   <div className="flex items-center justify-center h-screen">
     <div className="bg-white overflow-hidden shadow rounded-lg w-1/2">
      <form onSubmit={profileUpdateSubmitHandler} className="divide-y divide-gray-200 lg:col-span-9">
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">Edit Profile</h2>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <div className="relative flex-grow focus-within:z-10">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
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
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
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
          value={tagName.toString()}
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

        <select
          label='Featured Menu Item'
          id='featuredMenuItem'
          className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={Number(featuredMenuItem)}
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
              <button type="submit" className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update
              </button>
       </div>
        </div>
    </div>
      </form>
      </div>
  </div>
    );
}

export default ChefProfileUpdate;
