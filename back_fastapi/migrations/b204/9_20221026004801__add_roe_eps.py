from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` ADD `roe` DOUBLE;
        ALTER TABLE `stock` ADD `eps` DOUBLE;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` DROP COLUMN `roe`;
        ALTER TABLE `stock` DROP COLUMN `eps`;"""
