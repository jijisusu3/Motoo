from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `events` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `open_date` DATETIME(6) NOT NULL,
    `close_date` DATETIME(6) NOT NULL,
    `hall_of_fame` JSON
) CHARACTER SET utf8mb4;
        DROP TABLE IF EXISTS `event`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `events`;"""
