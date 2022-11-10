from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` ADD `rank` INT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` DROP COLUMN `rank`;"""
