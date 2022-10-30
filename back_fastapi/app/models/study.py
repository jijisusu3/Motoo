from tortoise import fields, Model


class Quiz(Model):
    question = fields.CharField(max_length=200)
    examples = fields.CharField(max_length=200)
    answer = fields.CharField(max_length=20)


class Voca(Model):
    voca = fields.CharField(max_length=100)
    explanation = fields.CharField(max_length=255)