from sqlalchemy.orm import Session

from app.models.question import Question


class QuestionRepository:

    # Create question
    @staticmethod
    def create_question(
        db: Session,
        question_data: dict
    ):

        question = Question(**question_data)

        db.add(question)

        db.commit()

        db.refresh(question)

        return question

    # Fetch questions for paper
    @staticmethod
    def get_questions_by_paper(
        db: Session,
        paper_id
    ):

        return (
            db.query(Question)
            .filter(Question.paper_id == paper_id)
            .all()
        )