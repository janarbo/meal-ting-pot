import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import {
  useGetAllChefProfilesQuery,
  useGetAllTagsQuery,
} from "./features/chef-profile/chefProfileApi";

const MainPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const { data: tags } = useGetAllTagsQuery();
  console.log(tags)
  const { data, isLoading } = useGetAllChefProfilesQuery();
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const navigate= useNavigate();

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    const newProfile = data.filter((newTag) => {
      return newTag.tag === tag.name;
    });
    setFilteredProfiles(newProfile);
    navigate(`/filtered/${tag.name}`); // navigate to the filtered page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex gap-2">
        {tags &&
          tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className={selectedTag === tag.name ? "font-bold" : ""}
            >
              {tag.name}
            </button>
          ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {(Array.isArray(filteredProfiles) && filteredProfiles.length > 0
          ? filteredProfiles
          : data
        ).map((profile) => (
          <div
            key={profile.profile_id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <img
              className="w-45 h-45 object-cover"
              src={profile.featured_menu_item}
              alt={profile.full_name}
            />
            <div className="px-4 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {profile.full_name}
              </h3>
              <p className="text-gray-500">{profile.address}</p>
              <p className="text-gray-500">{profile.availability}</p>
              <p className="text-gray-500">{profile.tags}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
 // const [token, result] = useGetTokenQuery();

    // return(
    //     <button onClick={() => {
    //         token();
    //     }}>
    //         Get token
    //     </button>
    // )

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
