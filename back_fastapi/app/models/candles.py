from tortoise import fields
from app.models.stocks import Candle

base_model = Candle
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


class CandleConstruction(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[0]}_candle')


class CandleFinance(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[1]}_candle')


class CandleMechanic(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[2]}_candle')


class CandleManufacturing(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[3]}_candle')


class CandleAgriculture(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[4]}_candle')


class CandleInsurance(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[5]}_candle')


class CandleNonmetal(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[6]}_candle')


class CandleService(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[7]}_candle')


class CandleFiber(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[8]}_candle')


class CandleTransportEquip(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[9]}_candle')


class CandleTransportDepot(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[10]}_candle')


class CandleDistribution(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[11]}_candle')


class CandleBank(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[12]}_candle')


class CandleFood(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[13]}_candle')


class CandleMedicalPrecision(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[14]}_candle')


class CandleMedication(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[15]}_candle')


class CandleElecGas(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[16]}_candle')


class CandleElectronic(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[17]}_candle')


class CandleWood(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[18]}_candle')


class CandleStockIndustry(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[19]}_candle')


class CandleSteel(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[20]}_candle')


class CandleTelecommunication(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[21]}_candle')


class CandleChemistry(base_model):
    stock = fields.ForeignKeyField('b204.Stock', related_name=f'{categories[22]}_candle')
