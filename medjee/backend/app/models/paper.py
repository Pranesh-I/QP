from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.db.base import Base


class Paper(Base):

    __tablename__ = "papers"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    filename = Column(
        String(255),
        nullable=False
    )

    storage_path = Column(Text)

    std = Column(String(10))

    paper_type = Column(String(50))

    total_marks = Column(Integer)

    duration_mins = Column(Integer)

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )