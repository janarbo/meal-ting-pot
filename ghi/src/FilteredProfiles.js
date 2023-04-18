import React, { useState, useEffect } from "react";
import {
  useGetAllChefProfilesQuery,
  useGetAllTagsQuery,
} from "./features/chef-profile/chefProfileApi";
import { useParams } from "react-router-dom";

const FilteredProfiles = () => {
  const { tagName } = useParams();
  const [profiles, setProfiles] = useState([]);
  // const { data: tags } = useGetAllTagsQuery();
  const { data, isLoading } = useGetAllChefProfilesQuery();

  useEffect(() => {

    setProfiles(data.filter((profile) => profile.tags.includes(tagName)));
  }, [data, tagName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {profiles.map((profile) => (
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
  );
};

export default FilteredProfiles;
