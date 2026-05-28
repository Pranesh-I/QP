from pathlib import Path
import uuid

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import settings


router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    upload_dir = Path(settings.UPLOAD_DIR)

    upload_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    job_id = str(uuid.uuid4())

    safe_filename = file.filename.replace(" ", "_")

    stored_path = upload_dir / f"{job_id}_{safe_filename}"

    content = await file.read()

    stored_path.write_bytes(content)

    return {
        "job_id": job_id,
        "filename": file.filename,
        "stored_path": str(stored_path),
        "status": "uploaded"
    }