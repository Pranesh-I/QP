from fastapi import APIRouter

from app.api.v1.routes.upload import router as upload_router


api_router = APIRouter()

api_router.include_router(
    upload_router,
    tags=["upload"]
)