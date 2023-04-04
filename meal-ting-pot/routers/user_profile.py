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


@router.post("/user_profile", response_model=Union[UserProfileOut, Error])
def create_user_profile(
    user_profile: UserProfileIn,
    response: Response,
    repo: UserProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    response.status = 400
    return repo.create(user_profile, account_data)
