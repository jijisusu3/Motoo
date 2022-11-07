from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` LONGTEXT;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` LONGTEXT;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` LONGTEXT;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` LONGTEXT;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` LONGTEXT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` LONGTEXT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` LONGTEXT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` LONGTEXT NOT NULL;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` JSON;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` JSON;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` JSON;
        ALTER TABLE `events` MODIFY COLUMN `hall_of_fame` JSON;"""
