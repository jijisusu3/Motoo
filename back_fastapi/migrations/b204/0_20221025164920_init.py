from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `aerich` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `version` VARCHAR(255) NOT NULL,
    `app` VARCHAR(100) NOT NULL,
    `content` JSON NOT NULL
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `event` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `open_date` DATETIME(6) NOT NULL,
    `close_date` DATETIME(6) NOT NULL,
    `hall_of_fame` JSON
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `school` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `schoolname` VARCHAR(24) NOT NULL,
    `location` VARCHAR(24) NOT NULL,
    `history` JSON
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(24) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `nickname` VARCHAR(24) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(24) NOT NULL,
    `birthday` DATETIME(6) NOT NULL
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `quiz` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `question` VARCHAR(200) NOT NULL,
    `examples` VARCHAR(200) NOT NULL,
    `answer` VARCHAR(20) NOT NULL
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `voca` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `voca` VARCHAR(100) NOT NULL,
    `explanation` VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
