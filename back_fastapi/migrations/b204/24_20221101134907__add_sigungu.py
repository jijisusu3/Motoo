from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `sigungu` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `sigungu` VARCHAR(24) NOT NULL,
    `sigu` VARCHAR(24) NOT NULL
) CHARACTER SET utf8mb4;;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `sigungu`;"""
