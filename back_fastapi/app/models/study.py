from tortoise import fields, Model


class Quiz(Model):
    question = fields.CharField(max_length=200)
    examples = fields.TextField()
    answer = fields.IntField()
    explanation = fields.TextField(null=True)


class Voca(Model):
    voca = fields.CharField(max_length=100)
    explanation = fields.CharField(max_length=255)
