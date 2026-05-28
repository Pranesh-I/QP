from sqlalchemy.orm import Session

from app.models.processing_job import ProcessingJob


class JobRepository:

    # Create processing job
    @staticmethod
    def create_job(
        db: Session,
        paper_id
    ):

        job = ProcessingJob(
            paper_id=paper_id,
            status="pending",
            progress="uploaded"
        )

        db.add(job)

        db.commit()

        db.refresh(job)

        return job

    # Update job status
    @staticmethod
    def update_job_status(
        db: Session,
        job_id,
        status: str,
        progress: str = None,
        error_log: str = None
    ):

        job = (
            db.query(ProcessingJob)
            .filter(ProcessingJob.id == job_id)
            .first()
        )

        if not job:
            return None

        job.status = status

        if progress:
            job.progress = progress

        if error_log:
            job.error_log = error_log

        db.commit()

        db.refresh(job)

        return job

    # Get job by ID
    @staticmethod
    def get_job(
        db: Session,
        job_id
    ):

        return (
            db.query(ProcessingJob)
            .filter(ProcessingJob.id == job_id)
            .first()
        )