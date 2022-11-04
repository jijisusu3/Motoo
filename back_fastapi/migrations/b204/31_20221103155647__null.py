from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `quiz` MODIFY COLUMN `explanation` LONGTEXT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `quiz` MODIFY COLUMN `explanation` LONGTEXT NOT NULL;"""
