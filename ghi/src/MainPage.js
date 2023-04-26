import React, { useState } from "react";
import {
  useGetAllChefProfilesQuery,
  useGetAllTagsQuery,
} from "./features/chef-profile/chefProfileApi";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import NoAvatar from "./images/NoAvatar.png";


const MainPage = () => {
  const profileImage = NoAvatar;
  const addDefaultSrc = (event) => {
        event.target.src = profileImage;
  }

  const [selectedTag, setSelectedTag] = useState(null);
  const { data: tags, isLoading: tagsLoading } = useGetAllTagsQuery();
  const { data: chefProfiles, isLoading: chefProfilesLoading } = useGetAllChefProfilesQuery();

  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const navigate = useNavigate();

  const handleProfileClick = (fullName, userId, profileId) => {
    navigate(`/chef/${fullName}/${userId}/${profileId}/`);
  }

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    const newProfiles = chefProfiles.filter((profile) => profile.tags.includes(tag.name));
    setFilteredProfiles(newProfiles);
  }

  if (tagsLoading || chefProfilesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen font-sans">
        <div className="pt-3 pl-5 pr-5 max-w-screen-2xl mx-auto">
          <h2 className="text-xl leading-6 font-normal pb-3">Browse by Cuisine</h2>
          <div className="flex gap-2">
            {tags &&
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag)}
                  className="text-gray-800 py-2 px-2 border rounded-full mb-4 hover:bg-gray-100 mr-1"
                >
                  {tag.name}
                </button>
              ))}
          </div>
          <hr className="mt-0 mb-4"></hr>
          <h2 className="text-xl leading-6 font-normal">Explore Chefs</h2>
          <div data-theme="garden" className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(Array.isArray(filteredProfiles) && filteredProfiles.length > 0
            ? filteredProfiles
            : chefProfiles
          ).map((profile) => (
              <div
                className="bg-white overflow-hidden shadow rounded-lg hover:cursor-pointer"
                key={profile.user_id}
                onClick={() => handleProfileClick(profile.full_name, profile.user_id, profile.profile_id)}
              >
                <img
                  className="w-full h-48 md:h-50 rounded object-cover"
                  src={profile.featured_menu_item}
                  alt={profile.featured_menu_item}
                />
                <div className="px-4 py-3">
                  <div className="flex">
                    <img onError={addDefaultSrc} alt={profile.photo} className="max-h-12 max-w-12 w-12 h-12 rounded-full" src={profile.photo} />
                    <div className="ml-5">
                      <h3 className="text-xl font-normal mb-0">
                        {profile.full_name}
                      </h3>
                      <p className="font-light">{profile.tags}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="mb-0"></hr>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
