from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `trading` RENAME COLUMN `ticker_id` TO `ticker`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `trading` RENAME COLUMN `ticker` TO `ticker_id`;"""
