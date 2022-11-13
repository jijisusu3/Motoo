from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `trading` ADD `tr_avg` INT   COMMENT '평균 매입 단가';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `trading` DROP COLUMN `tr_avg`;"""
