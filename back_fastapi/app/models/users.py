from tortoise import fields, Model


class User(Model):
    email = fields.CharField(max_length=24)
    username = fields.CharField(max_length=20)
    nickname = fields.CharField(max_length=24)
    password = fields.CharField(max_length=100)
    phone_number = fields.CharField(max_length=24)
    birthday = fields.DatetimeField()
    shool_id = fields.IntField(null=True)
    my_stock = fields.ManyToManyField('b204.Stock', through='favoritestock', related_name='stock_user')


class School(Model):
    schoolname = fields.CharField(max_length=24)
    location = fields.CharField(max_length=24)
    history = fields.JSONField(null=True)


class Event(Model):
    open_date = fields.DatetimeField()
    close_date = fields.DatetimeField()
    hall_of_fame = fields.JSONField(null=True)