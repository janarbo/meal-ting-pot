import React, { useState } from "react";
import {
  useGetAllChefProfilesQuery,
  useGetAllTagsQuery,
} from "./features/chef-profile/chefProfileApi";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const { data: tags } = useGetAllTagsQuery();
  const { data, isLoading } = useGetAllChefProfilesQuery();
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const navigate = useNavigate();

  const handleProfileClick = (fullName, userId, profileId) => {
    navigate(`/chef/${fullName}/${userId}/${profileId}/`);
  }

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    const newProfiles = data.filter((profile) => profile.tags.includes(tag.name));
    setFilteredProfiles(newProfiles);
  }


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
      <div > <h2 className="text-lg leading-6 font-medium text-gray-900">Explore Chefs</h2></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {(Array.isArray(filteredProfiles) && filteredProfiles.length > 0
          ? filteredProfiles
          : data
        ).map((profile) => (
          <div
            key={profile.user_id}
            className="bg-white overflow-hidden shadow rounded-lg"
            onClick={() => handleProfileClick(profile.full_name, profile.user_id, profile.profile_id)}
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
      <Footer />
    </>
  );
};

export default MainPage;
