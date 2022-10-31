from tortoise import fields, Model


class User(Model):
    email = fields.CharField(max_length=24)
    username = fields.CharField(max_length=20)
    nickname = fields.CharField(max_length=24)
    role = fields.CharField(max_length=30)
    school_id = fields.IntField(null=True)
    current = fields.IntField()
    my_stock = fields.ManyToManyField('b204.Stock', through='favoritestock', related_name='stock_user')


class School(Model):
    schoolname = fields.CharField(max_length=24)
    location = fields.CharField(max_length=24)
    history = fields.JSONField()


class Event(Model):
    open_date = fields.DatetimeField()
    close_date = fields.DatetimeField()
    hall_of_fame = fields.JSONField(null=True)