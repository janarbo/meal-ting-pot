import React from 'react';
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useGetAllChefProfilesQuery } from '../chef-profile/chefProfileApi';

const ProtectChefFromChef = ({ token }) => {
    const { profileId } = useParams();
    const userId  = parseInt(token.account.id)

    const { data, isLoading } = useGetAllChefProfilesQuery();

    if (isLoading) {
        return(
            <div>Loading...</div>
        )
    }

    const matchedProfile = data.find(profile => profile.profile_id === parseInt(profileId))

    return (
        matchedProfile.user_id !== userId ?
        <Navigate to ="/home" replace />
        :
        <Outlet />
    );
};

export default ProtectChefFromChef;
