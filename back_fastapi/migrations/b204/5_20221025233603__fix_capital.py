from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` MODIFY COLUMN `history` JSON NOT NULL;
        ALTER TABLE `category` MODIFY COLUMN `keyword` JSON NOT NULL;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` BIGINT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` INT;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` INT;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` INT;
        ALTER TABLE `stock` MODIFY COLUMN `m_capitia` INT;
        ALTER TABLE `school` MODIFY COLUMN `history` JSON;
        ALTER TABLE `category` MODIFY COLUMN `keyword` JSON;"""
