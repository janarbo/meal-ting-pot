import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneProfileQuery } from './chefProfileApi';

function ChefProfilePage() {
  const { profileId } = useParams();

  const { data: profile, isLoading, isError } = useGetOneProfileQuery(profileId) || {}


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading chef profile</div>;
  }

  if (!profile) {
    return <div>Chef profile not found</div>;
  }

  return (
  <table className="border-collapse border border-gray-400">
    <tbody>
      <tr className="bg-gray-200">
        <th className="border border-gray-400 px-4 py-2">Name:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.full_name}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Email:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.email}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Photo:</th>
        <td className="border border-gray-400 px-4 py-2"><img src={profile.photo} alt="Profile" className="h-16 w-16 object-cover rounded-full" /></td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Phone Number:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.phone_number}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Address:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.address}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Bio:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.bio}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Availability:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.availability ? 'Available' : 'Not Available'}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Tags:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.tags}</td>
      </tr>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Featured Menu Item:</th>
        <td className="border border-gray-400 px-4 py-2">{profile.featured_menu_item}</td>
      </tr>
    </tbody>
  </table>
);
}

export default ChefProfilePage;
