from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` ADD `average` DOUBLE;
        ALTER TABLE `school` ADD `today` LONGTEXT;
        ALTER TABLE `school` ADD `rank` INT;
        ALTER TABLE `sigungu` ADD `group` LONGTEXT;
        ALTER TABLE `sigungu` ADD `personal` LONGTEXT;
        ALTER TABLE `stock` ADD `div_yield` DOUBLE;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `stock` DROP COLUMN `div_yield`;
        ALTER TABLE `school` DROP COLUMN `average`;
        ALTER TABLE `school` DROP COLUMN `today`;
        ALTER TABLE `school` DROP COLUMN `rank`;
        ALTER TABLE `sigungu` DROP COLUMN `group`;
        ALTER TABLE `sigungu` DROP COLUMN `personal`;"""
