from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `sigungu` RENAME COLUMN `sigu` TO `sido`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `sigungu` RENAME COLUMN `sido` TO `sigu`;"""
