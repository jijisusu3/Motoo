from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` ADD `role` VARCHAR(30) NOT NULL;
        ALTER TABLE `user` DROP COLUMN `password`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` ADD `password` VARCHAR(100) NOT NULL;
        ALTER TABLE `user` DROP COLUMN `role`;"""
