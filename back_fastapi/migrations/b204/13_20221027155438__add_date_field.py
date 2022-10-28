from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `candle` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candleagriculture` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlebank` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlechemistry` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candleconstruction` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candledistribution` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candleelecgas` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candleelectronic` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlefiber` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlefinance` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlefood` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candleinsurance` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlemanufacturing` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlemechanic` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlemedicalprecision` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlemedication` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlenonmetal` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candleservice` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlesteel` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlestockindustry` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candletelecommunication` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candletransportdepot` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candletransportequip` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);
        ALTER TABLE `candlewood` ADD `date` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `candle` DROP COLUMN `date`;
        ALTER TABLE `candlebank` DROP COLUMN `date`;
        ALTER TABLE `candlefood` DROP COLUMN `date`;
        ALTER TABLE `candlewood` DROP COLUMN `date`;
        ALTER TABLE `candlefiber` DROP COLUMN `date`;
        ALTER TABLE `candlesteel` DROP COLUMN `date`;
        ALTER TABLE `candleelecgas` DROP COLUMN `date`;
        ALTER TABLE `candlefinance` DROP COLUMN `date`;
        ALTER TABLE `candleservice` DROP COLUMN `date`;
        ALTER TABLE `candlemechanic` DROP COLUMN `date`;
        ALTER TABLE `candlenonmetal` DROP COLUMN `date`;
        ALTER TABLE `candlechemistry` DROP COLUMN `date`;
        ALTER TABLE `candleinsurance` DROP COLUMN `date`;
        ALTER TABLE `candleelectronic` DROP COLUMN `date`;
        ALTER TABLE `candlemedication` DROP COLUMN `date`;
        ALTER TABLE `candleagriculture` DROP COLUMN `date`;
        ALTER TABLE `candleconstruction` DROP COLUMN `date`;
        ALTER TABLE `candledistribution` DROP COLUMN `date`;
        ALTER TABLE `candlemanufacturing` DROP COLUMN `date`;
        ALTER TABLE `candlestockindustry` DROP COLUMN `date`;
        ALTER TABLE `candletransportdepot` DROP COLUMN `date`;
        ALTER TABLE `candletransportequip` DROP COLUMN `date`;
        ALTER TABLE `candlemedicalprecision` DROP COLUMN `date`;
        ALTER TABLE `candletelecommunication` DROP COLUMN `date`;"""
