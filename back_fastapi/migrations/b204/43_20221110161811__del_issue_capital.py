from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` DROP COLUMN `capital`;
        ALTER TABLE `stock` DROP COLUMN `issued`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` ADD `capital` INT;
        ALTER TABLE `stock` ADD `issued` BIGINT;"""
