"""Add is_pack_opened to assignments

Revision ID: 9e1f6b2c4a11
Revises: c04acb195045
Create Date: 2026-04-25 19:45:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9e1f6b2c4a11"
down_revision: Union[str, Sequence[str], None] = "c04acb195045"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "assignments",
        sa.Column("is_pack_opened", sa.Boolean(), nullable=False, server_default=sa.false()),
    )


def downgrade() -> None:
    op.drop_column("assignments", "is_pack_opened")
