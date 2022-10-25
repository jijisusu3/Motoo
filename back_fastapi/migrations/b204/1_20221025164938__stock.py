from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `category` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(24) NOT NULL,
    `keyword` JSON NOT NULL
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `stock` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ticker` VARCHAR(24) NOT NULL,
    `name` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `close_price` INT,
    `fluctuation_rate` DOUBLE,
    `fluctuation_price` INT,
    `volumn` INT,
    `trading_value` INT,
    `maximun` INT,
    `minimun` INT,
    `per` DOUBLE,
    `m_capitia` INT,
    `issued` INT,
    `capital` INT,
    `category_id` INT NOT NULL,
    CONSTRAINT `fk_stock_category_3920ac24` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `bidask` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_bidask_stock_acdf070b` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candle` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candle_stock_cc0b126d` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `day` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_day_stock_24f485b8` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `keyword` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `keyword` JSON,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_keyword_stock_2dc8f0fe` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `bidask`;
        DROP TABLE IF EXISTS `candle`;
        DROP TABLE IF EXISTS `category`;
        DROP TABLE IF EXISTS `day`;
        DROP TABLE IF EXISTS `keyword`;
        DROP TABLE IF EXISTS `stock`;"""
