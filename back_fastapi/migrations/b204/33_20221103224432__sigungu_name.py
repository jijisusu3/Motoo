from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `sigungu` RENAME COLUMN `sigungu` TO `sigungu_name`;
        ALTER TABLE `category` ADD `represent` JSON NOT NULL;
        ALTER TABLE `quiz` ADD `explanation` LONGTEXT;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `quiz` DROP COLUMN `explanation`;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `sigungu` RENAME COLUMN `sigungu_name` TO `sigungu`;
        ALTER TABLE `category` DROP COLUMN `represent`;"""
