from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    Text
)

from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

import uuid

from app.db.base import Base


class Question(Base):

    __tablename__ = "questions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    paper_id = Column(
        UUID(as_uuid=True),
        ForeignKey("papers.id", ondelete="CASCADE"),
        nullable=False
    )

    q_number = Column(Integer, nullable=False)

    subject = Column(Text, nullable=False)

    stem_text = Column(Text)

    latex_blocks = Column(
        JSONB,
        default=list
    )

    has_image = Column(
        Boolean,
        default=False
    )

    marks = Column(
        Integer,
        default=4
    )

    negative = Column(
        Numeric,
        default=-1
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )