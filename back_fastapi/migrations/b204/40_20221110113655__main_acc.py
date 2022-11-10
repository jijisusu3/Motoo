from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` DROP COLUMN `today`;
        ALTER TABLE `school` DROP COLUMN `rank`;
        ALTER TABLE `school` DROP COLUMN `average`;
        ALTER TABLE `sigungu` DROP COLUMN `group`;
        ALTER TABLE `sigungu` DROP COLUMN `personal`;
        ALTER TABLE `account` ADD `is_main` BOOL NOT NULL  DEFAULT 0;
        ALTER TABLE `stock` DROP COLUMN `div_yield`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` ADD `div_yield` DOUBLE;
        ALTER TABLE `school` ADD `today` LONGTEXT;
        ALTER TABLE `school` ADD `rank` INT;
        ALTER TABLE `school` ADD `average` DOUBLE;
        ALTER TABLE `account` DROP COLUMN `is_main`;
        ALTER TABLE `sigungu` ADD `group` LONGTEXT;
        ALTER TABLE `sigungu` ADD `personal` LONGTEXT;"""
