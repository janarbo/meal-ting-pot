import React from 'react';
import { useState } from 'react';
import { useCreateProfileMutation, useGetAllTagsQuery } from './features/chef-profile/chefProfileApi';
import {useNavigate} from 'react-router-dom'
import { useGetAllChefQuery } from './features/menu-items/menuItemApi';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import SideBar from "./SideBar";

function ProfileForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState(false);
  const [featuredMenuItem, setFeaturedMenuItem] = useState("");
  const [tagName, setTagName] = useState("");
  const { data: menuItems } = useGetAllChefQuery();
  const { data: tags } = useGetAllTagsQuery();
  const navigate = useNavigate();
  const [createProfile] = useCreateProfileMutation();

  const handleOnClick = () => {
    availability ? setAvailability(false) : setAvailability(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        full_name: fullName,
        email: email,
        photo: photo,
        phone_number: phoneNumber,
        address: address,
        bio: bio,
        availability: availability,
        tags: tagName,
        featured_menu_item: featuredMenuItem,
      };
      await createProfile(payload);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white overflow-hidden shadow rounded-lg w-1/2">
        <form
          onSubmit={handleSubmit}
          className="divide-y divide-gray-200 lg:col-span-9"
        >
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h2>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="flex-grow space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="text"
                      name="photo"
                      label="photo"
                      id="photo"
                      autoComplete="photo"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                      placeholder="Photo"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      type="text"
                      name="phoneNumber"
                      label="phoneNumber"
                      id="phoneNumber"
                      autoComplete="phoneNumber"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                      placeholder="PhoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="bio"
                      name="bio"
                      rows="3"
                      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
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
                  <label
                    htmlFor="availability"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Availability
                  </label>
                </div>

                <select
                  label="tags"
                  id="tags"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-base-100 rounded-md shadow-sm focus:outline-none focus:ring-base-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Tag</option>
                  {tags?.map((tag) => {
                    return (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  label="Featured Menu Item"
                  id="featuredMenuItem"
                  className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={featuredMenuItem}
                  onChange={(e) => setFeaturedMenuItem(e.target.value)}
                >
                  <option value="">Signature Dish</option>
                  {menuItems?.map((menuItem) => {
                    return (
                      <option
                        key={menuItem.menu_item_id}
                        value={menuItem.menu_item_id}
                      >
                        {menuItem.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  type="submit"
                  className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
        <SideBar />
      </div>
    </div>
  );
}
export default ProfileForm;
