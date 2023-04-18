from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.tags import Tag, TagRepository, Error
from pydantic import ValidationError




router = APIRouter()


@router.get("/tags", response_model=Union[List[Tag], Error])
def get_all_tags(
    response: Response,
    repo: TagRepository = Depends(),
) -> Union[List[Tag], Error]:
    try:
        tags = repo.get_all_tags()
        if tags is None:
            return {"message": "No tags found"}
        return tags
    except ValidationError as e:
        return {"message": "ERROR"}
