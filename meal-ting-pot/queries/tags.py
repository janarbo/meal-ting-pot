from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


# Define a Tag model for the response data
class Tag(BaseModel):
    id : int
    name: str


# Define a GET endpoint to retrieve all tags
class TagRepository:
    def get_all_tags(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM tags
                        """,
                    )

                    results = db.fetchall()
                    if results is None:
                        return None
                    tags = []
                    for result in results:
                        tag = Tag(id=result[0], name=result[1])
                        tags.append(tag)
                    return tags
        except Exception:
            return {"message": "Could not get the tags"}
