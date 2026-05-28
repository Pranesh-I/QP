from sqlalchemy import (
    Column,
    ForeignKey,
    String,
    Text
)

from sqlalchemy.dialects.postgresql import JSONB, UUID
import uuid

from app.db.base import Base


class Image(Base):

    __tablename__ = "images"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    question_id = Column(
        UUID(as_uuid=True),
        ForeignKey("questions.id", ondelete="CASCADE")
    )

    storage_path = Column(
        Text,
        nullable=False
    )

    bbox = Column(JSONB)

    image_type = Column(String(50))