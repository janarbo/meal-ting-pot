from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.user_profile import (
    UserProfileIn,
    UserProfileRepository,
    UserProfileOut,
    Error,
)


from authenticator import authenticator

router = APIRouter()


@router.post("/profile", response_model=Union[UserProfileOut, Error])
def create_user_profile(
    user_profile: UserProfileIn,
    response: Response,
    repo: UserProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    response.status = 400
    return repo.create(user_profile, account_data)

@router.get("/profile/{profile_id}",response_model=Union[UserProfileOut, Error])
def get_one_profile(
    profile_id: int,
    response : Response,
    repo: UserProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserProfileOut:
    user_profile = repo.get_one(profile_id)
    if user_profile is None:
        response.status_code = 404
    return user_profile

@router.put("/profile/{profile_id}",response_model=Union[UserProfileOut, Error])
def update_profile(
    profile_id: int,
    user_profile: UserProfileIn,
    repo: UserProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, UserProfileOut]:
    return repo.update(profile_id, user_profile, account_data)
