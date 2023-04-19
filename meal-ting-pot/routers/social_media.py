from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.social_media import (
    SocialMediaIn,
    SocialMediaOut,
    SocialMediaRepository,
    Error,
)


from authenticator import authenticator

router = APIRouter()


@router.post("/social-media", response_model=Union[SocialMediaOut, Error])
def create_social_media(
    social_media: SocialMediaIn,
    response: Response,
    repo: SocialMediaRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status = 400
    return repo.create(social_media)


@router.put("/social-media/{id}", response_model=Union[SocialMediaOut, Error])
def update_social_media(
    id: int,
    social_media: SocialMediaIn,
    repo: SocialMediaRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[SocialMediaOut, Error]:
    return repo.update(id, social_media)


@router.delete("/social-media/{id}", response_model=bool)
def delete_social_media(
    id: int,
    repo: SocialMediaRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(id)
