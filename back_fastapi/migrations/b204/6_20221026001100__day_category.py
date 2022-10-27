from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `chemistry` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_chemistr_stock_d57caf04` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayagriculture` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayagric_stock_1e97df6d` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daybank` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daybank_stock_c40d00ec` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayconstruction` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayconst_stock_b5bb35af` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daydistribution` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daydistr_stock_d1e23d88` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayelecgas` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayelecg_stock_b6c99500` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayelectronic` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayelect_stock_f9e38102` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayfiber` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayfiber_stock_874d5549` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayfinance` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayfinan_stock_1a9b39b4` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayfood` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayfood_stock_2e44b0e3` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayinsurance` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayinsur_stock_d2c2c8d7` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daymanufacturing` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daymanuf_stock_7458ffdc` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daymechanic` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daymecha_stock_ece1dd8c` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daymedicalprecision` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daymedic_stock_c2fd76dc` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daymedication` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daymedic_stock_3c1751a7` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daynonmetal` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daynonme_stock_4968b990` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `dayservice` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_dayservi_stock_56088eb4` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daysteel` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daysteel_stock_7bd33878` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daystockindustry` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daystock_stock_32421c39` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daytelecommunication` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daytelec_stock_e633aff5` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daytransportdepot` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daytrans_stock_14c727fa` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daytransportequip` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daytrans_stock_eeada6d9` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `daywood` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daywood_stock_8d0f9118` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `chemistry`;
        DROP TABLE IF EXISTS `dayagriculture`;
        DROP TABLE IF EXISTS `daybank`;
        DROP TABLE IF EXISTS `dayconstruction`;
        DROP TABLE IF EXISTS `daydistribution`;
        DROP TABLE IF EXISTS `dayelecgas`;
        DROP TABLE IF EXISTS `dayelectronic`;
        DROP TABLE IF EXISTS `dayfiber`;
        DROP TABLE IF EXISTS `dayfinance`;
        DROP TABLE IF EXISTS `dayfood`;
        DROP TABLE IF EXISTS `dayinsurance`;
        DROP TABLE IF EXISTS `daymanufacturing`;
        DROP TABLE IF EXISTS `daymechanic`;
        DROP TABLE IF EXISTS `daymedicalprecision`;
        DROP TABLE IF EXISTS `daymedication`;
        DROP TABLE IF EXISTS `daynonmetal`;
        DROP TABLE IF EXISTS `dayservice`;
        DROP TABLE IF EXISTS `daysteel`;
        DROP TABLE IF EXISTS `daystockindustry`;
        DROP TABLE IF EXISTS `daytelecommunication`;
        DROP TABLE IF EXISTS `daytransportdepot`;
        DROP TABLE IF EXISTS `daytransportequip`;
        DROP TABLE IF EXISTS `daywood`;"""
