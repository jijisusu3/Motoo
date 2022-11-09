from tortoise import fields
from app.models.stocks import Day

base_model = Day
categories = [
    "construction",
    "finance",
    "mechanic",
    "manufacturing",
    "agriculture",
    "insurance",
    "nonmetal",
    "service",
    "fiber",
    "transport_equip",
    "transport_depot",
    "distribution",
    "bank",
    "food",
    "medical_precision",
    "medication",
    "elec_gas",
    "Electronic",
    "wood",
    "stock_industry",
    "steel",
    "telecommunication",
    "chemistry"
]


class DayConstruction(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[0]}_daychart')


class DayFinance(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[1]}_daychart')


class DayMechanic(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[2]}_daychart')


class DayManufacturing(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[3]}_daychart')


class DayAgriculture(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[4]}_daychart')


class DayInsurance(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[5]}_daychart')


class DayNonmetal(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[6]}_daychart')


class DayService(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[7]}_daychart')


class DayFiber(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[8]}_daychart')


class DayTransportEquip(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[9]}_daychart')


class DayTransportDepot(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[10]}_daychart')


class DayDistribution(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[11]}_daychart')


class DayBank(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[12]}_daychart')


class DayFood(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[13]}_daychart')


class DayMedicalPrecision(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[14]}_daychart')


class DayMedication(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[15]}_daychart')


class DayElecGas(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[16]}_daychart')


class DayElectronic(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[17]}_daychart')


class DayWood(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[18]}_daychart')


class DayStockIndustry(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[19]}_daychart')


class DaySteel(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[20]}_daychart')


class DayTelecommunication(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[21]}_daychart')


class DayChemistry(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[22]}_daychart')
