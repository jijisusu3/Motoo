from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `account` ADD `school` BOOL NOT NULL  DEFAULT 0;
        ALTER TABLE `account` DROP COLUMN `type`;
        ALTER TABLE `category` ADD `sentiment` JSON NOT NULL;
        ALTER TABLE `keyword` ADD `sentiment` JSON NOT NULL;
        ALTER TABLE `keyword` MODIFY COLUMN `keyword` JSON NOT NULL;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `account` ADD `type` INT NOT NULL;
        ALTER TABLE `account` DROP COLUMN `school`;
        ALTER TABLE `keyword` DROP COLUMN `sentiment`;
        ALTER TABLE `keyword` MODIFY COLUMN `keyword` JSON;
        ALTER TABLE `category` DROP COLUMN `sentiment`;"""
