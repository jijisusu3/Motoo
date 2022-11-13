from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` RENAME COLUMN `m_capitia` TO `m_capital`;
        ALTER TABLE `stock` MODIFY COLUMN `issued` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `issued` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `issued` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `issued` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` BIGINT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` BIGINT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` RENAME COLUMN `m_capital` TO `m_capitia`;
        ALTER TABLE `stock` MODIFY COLUMN `issued` INT;
        ALTER TABLE `stock` MODIFY COLUMN `issued` INT;
        ALTER TABLE `stock` MODIFY COLUMN `issued` INT;
        ALTER TABLE `stock` MODIFY COLUMN `issued` INT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` INT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` INT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` INT;
        ALTER TABLE `stock` MODIFY COLUMN `trading_value` INT;"""
