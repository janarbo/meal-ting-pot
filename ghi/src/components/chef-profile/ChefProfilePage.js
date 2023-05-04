import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useGetOneProfileQuery } from '../../features/chef-profile/chefProfileApi';
import SideBar from '../../SideBar';

function ChefProfilePage() {
  const { profileId } = useParams();

  const navigate = useNavigate();

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
  const handleClick = () => {
    navigate(`/chef/profile/${profileId}/edit`);
  };


return (
  <div className="font-sans" style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ marginTop: "200px", marginLeft: "20px", wordWrap: "break-word", flex: 1 }}>
      <SideBar />
    </div>
    <div style={{ flex: 2 }}>
      <div className="overflow-x-auto bg-white items-center justify-center" style={{ width: "80%", maxWidth: "800px", marginTop:"100px"}}>
          <div data-theme="garden" className="overflow-x-auto bg-white items-center justify-center">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900 text-center" style={{ marginBottom: "20px" }}>
                My Profile
              </h2>
            </div>
        <table className="table w-full items-center justify-center " style={{justifyContent: "center", backgroundColor: '#edf8f3'}}>
          <tbody className="items-center justify-center">
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Name</th>
              <td className="border border-green-500 px-4 py-2">{profile.full_name}</td>
            </tr>
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Email</th>
              <td className="border border-green-500 px-4 py-2">{profile.email}</td>
            </tr>
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Photo</th>
              <td className="border border-green-500 px-4 py-2">
                <img src={profile.photo} alt="Profile" className="h-16 w-16 object-cover rounded-full" />
              </td>
            </tr>
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Phone Number</th>
              <td className="border border-green-500 px-4 py-2">{profile.phone_number}</td>
            </tr>
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Address</th>
              <td className="border border-green-500 px-4 py-2">{profile.address}</td>
            </tr>
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Bio</th>
              <td className="border border-green-500 px-4 py-2" style={{ whiteSpace: 'pre-wrap' }}>{profile.bio}</td>
            </tr>
            <tr className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Availability</th>
              {profile.featured_menu_item ? (
                <td className="border border-green-500 px-4 py-2">{profile.availability ? 'Available' : 'Not Available'}</td>
              ) : (
                <td className="border border-green-500 px-4 py-2">Not Available. Please create a menu item first.</td>
              )}
            </tr>
            <tr  className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Tags</th>
              <td className="border border-green-500 px-4 py-2">{profile.tags}</td>
            </tr>
            <tr  className="bg-green-200 hover">
              <th className="border border-green-500 px-4 py-2">Featured Menu Item</th>
              <td className="border border-green-500 px-4 py-2">{profile.featured_menu_item}</td>
            </tr>
          </tbody>
        </table>
         <button
           onClick={handleClick}
           className=" w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a7e18d] hover:bg-[#8cc07b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{marginTop:"0px", marginBottom:"1000px"}}>
          Update
        </button>
        </div>
  </div>
      </div>
  </div>

);
}

export default ChefProfilePage;
