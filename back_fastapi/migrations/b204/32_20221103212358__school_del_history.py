from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `school` DROP COLUMN `history`;
        ALTER TABLE `category` DROP COLUMN `represent`;
        ALTER TABLE `quiz` DROP COLUMN `explanation`;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` VARCHAR(200) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` VARCHAR(20) NOT NULL;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `quiz` ADD `explanation` LONGTEXT;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `examples` JSON NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `quiz` MODIFY COLUMN `answer` INT NOT NULL;
        ALTER TABLE `school` ADD `history` JSON NOT NULL;
        ALTER TABLE `category` ADD `represent` JSON NOT NULL;"""
