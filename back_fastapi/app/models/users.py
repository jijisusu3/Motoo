from tortoise import fields, Model


class User(Model):
    email = fields.CharField(max_length=24)
    nickname = fields.CharField(max_length=24)
    role = fields.CharField(max_length=30, null=True)
    school_id = fields.IntField(null=True)
    current = fields.IntField()
    my_stock = fields.ManyToManyField('b204.Stock', through='favoritestock', related_name='stock_user')


class SiGunGu(Model):
    sigungu = fields.CharField(max_length=24)
    sido = fields.CharField(max_length=24)


class School(Model):
    schoolname = fields.CharField(max_length=24)
    sigungu = fields.ForeignKeyField('b204.SiGunGu', related_name='schools')


class Event(Model):
    open_date = fields.DatetimeField()
    close_date = fields.DatetimeField()
    hall_of_fame = fields.JSONField(null=True)