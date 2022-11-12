from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` ADD `rank` INT;
        ALTER TABLE `school` ADD `average` DOUBLE;
        ALTER TABLE `school` ADD `today` LONGTEXT;
        ALTER TABLE `sigungu` ADD `group` LONGTEXT;
        ALTER TABLE `sigungu` ADD `personal` LONGTEXT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` DROP COLUMN `rank`;
        ALTER TABLE `school` DROP COLUMN `average`;
        ALTER TABLE `school` DROP COLUMN `today`;
        ALTER TABLE `sigungu` DROP COLUMN `group`;
        ALTER TABLE `sigungu` DROP COLUMN `personal`;"""
