from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` ADD `shool_id` INT;
        CREATE TABLE `favoritestock` (
    `user_id` INT NOT NULL REFERENCES `user` (`id`) ON DELETE CASCADE,
    `stock_id` INT NOT NULL REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `favoritestock`;
        ALTER TABLE `user` DROP COLUMN `shool_id`;"""
