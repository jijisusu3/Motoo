from tortoise import fields, Model


class Account(Model):
    seed = fields.IntField()
    created_at = fields.DatetimeField(auto_now_add=True)
    school = fields.BooleanField(default=False)
    name = fields.CharField(max_length=24)
    is_main = fields.BooleanField(default=False)
    user = fields.ForeignKeyField('b204.User', related_name='accounts', description='계좌 생성 유저')


class Trading(Model):
    user = fields.ForeignKeyField('b204.User', related_name='tradings_by_user', description='유저별 거래내역')
    account = fields.ForeignKeyField('b204.Account', related_name='tradings_by_account', description='계좌별 거래내역')
    ticker_name = fields.CharField(max_length=24, null=True)
    ticker = fields.CharField(max_length=24, null=True)
    tr_type = fields.IntField()
    tr_price = fields.IntField()
    tr_amount = fields.IntField()
    tr_avg = fields.IntField(null=True, description='평균 매입 단가')
    tr_date = fields.DatetimeField(null=True)


class AccountStock(Model):
    account = fields.ForeignKeyField('b204.Account', related_name='account_stock', description='계좌별 주식보유량')
    stock = fields.ForeignKeyField('b204.Stock', related_name='account_stock', description='종목별 주식보유량')
    amount = fields.IntField(description='보유량')
    price = fields.IntField(description='평단가')
