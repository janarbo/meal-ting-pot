import React from "react";
import { NavLink } from 'react-router-dom'
import { useGetTokenQuery } from "./features/auth/authAPI";
import { useGetAllChefProfilesQuery } from './features/chef-profile/chefProfileApi';


const MainPage = () => {
    // const [token, result] = useGetTokenQuery();

    // return(
    //     <button onClick={() => {
    //         token();
    //     }}>
    //         Get token
    //     </button>
    // )
  const { data, isLoading } = useGetAllChefProfilesQuery();
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.isArray(data) && data.map((profile) => (
        <div key={profile.profile_id} className="bg-white overflow-hidden shadow rounded-lg">
          <img className="w-45 h-45 object-cover" src={profile.featured_menu_item} alt={profile.full_name} />
          <div className="px-4 py-4">
            <h3 className="text-lg font-medium text-gray-900">{profile.full_name}</h3>
            <p className="text-gray-500">{profile.address}</p>
            <p className="text-gray-500">{profile.availability}</p>
            <p className="text-gray-500">{profile.tags}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


export default MainPage

// import { useState } from 'react';
// import { useGetAllChefProfilesQuery } from '../features/chef-profile/chefProfileApi';

// function ChefProfileList() {
//   const { data, isLoading } = useGetAllChefProfilesQuery();
//   console.log(data);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>name</th>
//             <th>addresss</th>
//             <th>availability</th>
//             <th>tags</th>
//             <th>featured_menu_item</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data && data.map((profile) => (
//             <tr key={profile.profile_id}>
//               <td>{profile.full_name}</td>
//               <td>{profile.address}</td>
//               <td>{profile.availability}</td>
//               <td>{profile.tags}</td>
//                 <td>
//                 {profile.featured_menu_item && <img src={profile.featured_menu_item} alt="Featured menu item" style={{ width: '200px', height: '200px' }} />}
//               </td>
//             </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ChefProfileList;
