from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `account` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `seed` INT NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `type` INT NOT NULL,
    `name` VARCHAR(24) NOT NULL,
    `user_id` INT NOT NULL COMMENT '계좌 생성 유저',
    CONSTRAINT `fk_account_user_9940bd8a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `accountstock` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `amount` INT NOT NULL  COMMENT '보유량',
    `price` INT NOT NULL  COMMENT '평단가',
    `account_id` INT NOT NULL COMMENT '계좌별 주식보유량',
    `stock_id` INT NOT NULL COMMENT '종목별 주식보유량',
    CONSTRAINT `fk_accounts_account_b4dafe60` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_accounts_stock_793c58bd` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
        CREATE TABLE IF NOT EXISTS `trading` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ticker_name` VARCHAR(24),
    `ticker_id` VARCHAR(24),
    `tr_type` INT NOT NULL,
    `tr_price` INT NOT NULL,
    `tr_amount` INT NOT NULL,
    `tr_date` DATETIME(6),
    `account_id` INT NOT NULL COMMENT '계좌별 거래내역',
    `user_id` INT NOT NULL COMMENT '유저별 거래내역',
    CONSTRAINT `fk_trading_account_d7b23088` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_trading_user_fbd8f164` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS `account`;
        DROP TABLE IF EXISTS `accountstock`;
        DROP TABLE IF EXISTS `trading`;"""
