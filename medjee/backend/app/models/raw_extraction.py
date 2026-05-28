from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Text
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

import uuid

from app.db.base import Base


class RawExtraction(Base):

    __tablename__ = "raw_extractions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    paper_id = Column(
        UUID(as_uuid=True),
        ForeignKey("papers.id", ondelete="CASCADE")
    )

    raw_markdown = Column(
        Text,
        nullable=False
    )

    extracted_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )