from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` DROP COLUMN `phone_number`;
        ALTER TABLE `user` DROP COLUMN `birthday`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` ADD `phone_number` VARCHAR(24) NOT NULL;
        ALTER TABLE `user` ADD `birthday` DATETIME(6) NOT NULL;"""
