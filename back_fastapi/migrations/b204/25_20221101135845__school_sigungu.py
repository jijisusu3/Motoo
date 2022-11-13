from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` ADD `sigungu_id` INT NOT NULL;
        ALTER TABLE `school` ADD CONSTRAINT `fk_school_sigungu_f0383e24` FOREIGN KEY (`sigungu_id`) REFERENCES `sigungu` (`id`) ON DELETE CASCADE;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` DROP FOREIGN KEY `fk_school_sigungu_f0383e24`;
        ALTER TABLE `school` DROP COLUMN `sigungu_id`;"""
