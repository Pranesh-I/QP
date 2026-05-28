from sqlalchemy.orm import Session

from app.models.paper import Paper


class PaperRepository:

    # Create a new paper record
    @staticmethod
    def create_paper(
        db: Session,
        filename: str,
        storage_path: str
    ):

        paper = Paper(
            filename=filename,
            storage_path=storage_path
        )

        db.add(paper)

        db.commit()

        db.refresh(paper)

        return paper

    # Fetch paper by ID
    @staticmethod
    def get_paper_by_id(
        db: Session,
        paper_id
    ):

        return (
            db.query(Paper)
            .filter(Paper.id == paper_id)
            .first()
        )