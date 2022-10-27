from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `daychemistry` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `date` VARCHAR(24) NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `close_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_daychemi_stock_a4dfa947` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candleagriculture` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleag_stock_36e46d3f` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlebank` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleba_stock_b98dfc39` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlechemistry` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlech_stock_fb7ffa81` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candleconstruction` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleco_stock_9754b5a9` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candledistribution` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candledi_stock_501160d9` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candleelecgas` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleel_stock_ec339693` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candleelectronic` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleel_stock_c0556966` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlefiber` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlefi_stock_2f21b049` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlefinance` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlefi_stock_23d35b23` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlefood` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlefo_stock_7a5a724a` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candleinsurance` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlein_stock_aa9ab4ee` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlemanufacturing` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlema_stock_e508eb82` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlemechanic` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleme_stock_48933df1` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlemedicalprecision` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleme_stock_7db38f8c` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlemedication` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleme_stock_1051af1a` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlenonmetal` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candleno_stock_8d21634d` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candleservice` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlese_stock_a1e68575` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlesteel` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlest_stock_45074222` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlestockindustry` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlest_stock_f3a5b062` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candletelecommunication` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlete_stock_11158675` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candletransportdepot` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candletr_stock_d33969e6` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candletransportequip` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candletr_stock_210f970a` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `candlewood` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `time` VARCHAR(24) NOT NULL,
    `price` INT NOT NULL,
    `volumn` INT,
    `open_price` INT NOT NULL,
    `max_price` INT NOT NULL,
    `min_price` INT NOT NULL,
    `stock_id_id` INT NOT NULL,
    CONSTRAINT `fk_candlewo_stock_e0b7b11b` FOREIGN KEY (`stock_id_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        DROP TABLE IF EXISTS `chemistry`;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `daychemistry`;
        DROP TABLE IF EXISTS `candleagriculture`;
        DROP TABLE IF EXISTS `candlebank`;
        DROP TABLE IF EXISTS `candlechemistry`;
        DROP TABLE IF EXISTS `candleconstruction`;
        DROP TABLE IF EXISTS `candledistribution`;
        DROP TABLE IF EXISTS `candleelecgas`;
        DROP TABLE IF EXISTS `candleelectronic`;
        DROP TABLE IF EXISTS `candlefiber`;
        DROP TABLE IF EXISTS `candlefinance`;
        DROP TABLE IF EXISTS `candlefood`;
        DROP TABLE IF EXISTS `candleinsurance`;
        DROP TABLE IF EXISTS `candlemanufacturing`;
        DROP TABLE IF EXISTS `candlemechanic`;
        DROP TABLE IF EXISTS `candlemedicalprecision`;
        DROP TABLE IF EXISTS `candlemedication`;
        DROP TABLE IF EXISTS `candlenonmetal`;
        DROP TABLE IF EXISTS `candleservice`;
        DROP TABLE IF EXISTS `candlesteel`;
        DROP TABLE IF EXISTS `candlestockindustry`;
        DROP TABLE IF EXISTS `candletelecommunication`;
        DROP TABLE IF EXISTS `candletransportdepot`;
        DROP TABLE IF EXISTS `candletransportequip`;
        DROP TABLE IF EXISTS `candlewood`;"""
