from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` RENAME COLUMN `rank` TO `current_rank`;
        ALTER TABLE `school` RENAME COLUMN `today` TO `stud_ranks`;
        ALTER TABLE `sigungu` RENAME COLUMN `group` TO `school_ranks`;
        ALTER TABLE `user` RENAME COLUMN `rank` TO `current_rank`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` RENAME COLUMN `current_rank` TO `rank`;
        ALTER TABLE `school` RENAME COLUMN `stud_ranks` TO `today`;
        ALTER TABLE `school` RENAME COLUMN `current_rank` TO `rank`;
        ALTER TABLE `sigungu` RENAME COLUMN `school_ranks` TO `group`;"""
