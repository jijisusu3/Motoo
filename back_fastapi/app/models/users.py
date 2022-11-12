from tortoise import fields, Model


class User(Model):
    email = fields.CharField(max_length=24)
    nickname = fields.CharField(max_length=24)
    role = fields.CharField(max_length=30, null=True)
    school_id = fields.IntField(null=True)
    current = fields.IntField()
    quiz_day = fields.DateField(null=True)
    my_stock = fields.ManyToManyField('b204.Stock', through='favoritestock', related_name='stock_user')
    current_rank = fields.IntField(null=True)
    average = fields.FloatField(null=True)


class SiGunGu(Model):
    sigungu_name = fields.CharField(max_length=24)
    sido = fields.CharField(max_length=24)
    school_ranks = fields.TextField(null=True)
    personal = fields.TextField(null=True)


class School(Model):
    schoolname = fields.CharField(max_length=24)
    sigungu = fields.ForeignKeyField('b204.SiGunGu', related_name='schools')
    current_rank = fields.IntField(null=True)
    stud_ranks = fields.TextField(null=True)
    average = fields.FloatField(null=True)


class Events(Model):
    open_date = fields.DatetimeField()
    close_date = fields.DatetimeField()
    hall_of_fame = fields.TextField(null=True)
