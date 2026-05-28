from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    String,
    Text
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

import uuid

from app.db.base import Base


class ProcessingJob(Base):

    __tablename__ = "processing_jobs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    paper_id = Column(
        UUID(as_uuid=True),
        ForeignKey("papers.id")
    )

    status = Column(
        String(20),
        default="pending"
    )

    progress = Column(String(100))

    error_log = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )