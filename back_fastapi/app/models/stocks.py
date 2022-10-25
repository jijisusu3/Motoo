from tortoise import fields, Model


class Category(Model):
    name = fields.CharField(max_length=24)
    keyword = fields.JSONField(null=True)


class Stock(Model):
    category = fields.ForeignKeyField('b204.Category', related_name='stocks')
    ticker = fields.CharField(max_length=24)
    name = fields.CharField(max_length=24)
    price = fields.IntField()
    close_price = fields.IntField(null=True)
    fluctuation_rate = fields.FloatField(null=True)
    fluctuation_price = fields.IntField(null=True)
    volumn = fields.IntField(null=True)
    trading_value = fields.IntField(null=True)
    maximun = fields.IntField(null=True)
    minimun = fields.IntField(null=True)
    per = fields.FloatField(null=True)
    m_capitia= fields.IntField(null=True)
    issued = fields.IntField(null=True)
    capital = fields.IntField(null=True)
    user = fields.ManyToManyField('b204.User', through='favoritestock', related_name='user_stock')


class Keyword(Model):
    stock_id = fields.ForeignKeyField('b204.Stock', related_name='keywords')
    keyword = fields.JSONField(null=True)


class Bidask(Model):
    stock_id = fields.ForeignKeyField('b204.Stock', related_name='bidask')


class Candle(Model):
    stock_id = fields.ForeignKeyField('b204.Stock', related_name='candlechart')
    time = fields.CharField(max_length=24)
    price = fields.IntField()
    volumn = fields.IntField(null=True)
    open_price = fields.IntField()
    max_price = fields.IntField()
    min_price = fields.IntField()


class Day(Model):
    stock_id = fields.ForeignKeyField('b204.Stock', related_name='daychart')
    date = fields.CharField(max_length=24)
    volumn = fields.IntField(null=True)
    open_price = fields.IntField()
    close_price = fields.IntField()
    max_price = fields.IntField()
    min_price = fields.IntField()