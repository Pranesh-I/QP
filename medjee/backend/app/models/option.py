from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Text
)

from sqlalchemy.dialects.postgresql import JSONB, UUID
import uuid

from app.db.base import Base


class Option(Base):

    __tablename__ = "options"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    question_id = Column(
        UUID(as_uuid=True),
        ForeignKey("questions.id", ondelete="CASCADE"),
        nullable=False
    )

    label = Column(Text, nullable=False)

    text_plain = Column(Text)

    latex_blocks = Column(
        JSONB,
        default=list
    )

    is_correct = Column(
        Boolean,
        default=False
    )