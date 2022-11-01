from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` DROP COLUMN `sido`;
        ALTER TABLE `school` DROP COLUMN `si`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` ADD `sido` VARCHAR(24) NOT NULL;
        ALTER TABLE `school` ADD `si` VARCHAR(24) NOT NULL;"""
