from tortoise import fields, Model


class Account(Model):
    seed = fields.IntField()
    created_at = fields.DatetimeField(auto_now_add=True)
    type = fields.IntField()
    name = fields.CharField()



