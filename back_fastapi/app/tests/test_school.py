import datetime
import pytest
from httpx import AsyncClient

from app.models.accounts import Trading, Account
from app.models.stocks import Stock, Category
from app.models.users import User, School, SiGunGu
from app.const import *


@pytest.mark.anyio
class TestSchoolHot:

    @pytest.mark.anyio
    async def test_school_hot_does_not_exist(self, client: AsyncClient):
        category = await Category.create(
            name='category_2',
            keyword=[1],
            info='category2 for test',
            sentiment=[20.83934247493744, 77.13800072669983, 2.022657170891762],
            represent=[]
        )
        await Stock.bulk_create([
            Stock(ticker='111111',
                  name='TMPCORP',
                  price=5400,
                  close_price=6000,
                  fluctuation_rate=-10,
                  fluctuation_price=-600,
                  volume=1000,
                  m_capital=54000000,
                  category_id=category.pk),
            Stock(ticker='000001',
                  name='TMPCORP2',
                  price=5400,
                  close_price=6000,
                  fluctuation_rate=-10,
                  fluctuation_price=-600,
                  volume=1000,
                  m_capital=54000000,
                  category_id=category.pk)]
        )
        res = await client.get("/stocks/school-hot/1")
        print(res)
        res_data = res.json()
        print(res_data)
        assert res.status_code == 404
        assert res_data["message"] == "failed"

    @pytest.mark.anyio
    async def test_school_hot_no_school(self, client: AsyncClient):
        await SiGunGu.bulk_create([
            SiGunGu(sigungu_name='테스구', sido='테스트'),
            SiGunGu(sigungu_name='스트구', sido='테스트'),
        ])
        await School.bulk_create(
            [
                School(
                    schoolname=f"{k}학교",
                    sigungu_id=k + 1
                )
                for k in range(2)
            ]
        )
        await User.bulk_create(
            [
                User(
                    email=f"test_user{k}@user.com",
                    nickname=f"user{k}",
                    current=1,
                    school_id=k // 4 if k > 3 else None
                )
                for k in range(12)
            ]
        )
        res = await client.get("/stocks/school-hot/4")
        res_data = res.json()
        print(res_data)
        assert res.status_code == 404
        assert res_data["message"] == "failed"

    @pytest.mark.anyio
    async def test_school_exist_but_no_tradings(self, client: AsyncClient):
        res = await client.get("/stocks/school-hot/5")
        res_data = res.json()
        print(res_data)
        assert res.status_code == 404
        assert res_data["message"] == "failed"
        assert res_data["stock_id"] is None
        assert res_data["stock_name"] is None
        assert res_data["stock_ticker"] is None

    @pytest.mark.anyio
    async def test_stock_exist_with_some_tradings(self, client: AsyncClient):
        users1 = await User.filter(school_id=1)
        users2 = await User.filter(school_id=2)
        stock1 = await Stock.get(ticker='111111')
        stock2 = await Stock.get(ticker='000001')
        for user in users1:
            school = await School.get(id=user.school_id)
            account = await Account.create(
                seed=1000000,
                school=True,
                name=f'{user.nickname}의{school.schoolname}계좌',
                user_id=user.pk
            )
            await Trading.bulk_create([
                Trading(
                    account_id=account.pk,
                    user_id=user.pk,
                    ticker_name='TMPCORP',
                    ticker='111111',
                    tr_type=1,
                    tr_price=1000,
                    tr_amount=100,
                    tr_date=None
                ),
                Trading(
                    account_id=account.pk,
                    user_id=user.pk,
                    ticker_name='TMPCORP',
                    ticker='111111',
                    tr_type=1,
                    tr_price=1000,
                    tr_amount=100,
                    tr_date=datetime.datetime.today()
                ),
                Trading(
                    account_id=account.pk,
                    user_id=user.pk,
                    ticker_name='TMPCORP2',
                    ticker='000001',
                    tr_type=1,
                    tr_price=1000,
                    tr_amount=100,
                    tr_date=datetime.datetime.today()
                )
            ])
        for user in users2:
            school = await School.get(id=user.school_id)
            account = await Account.create(
                seed=1000000,
                school=True,
                name=f'{user.nickname}의{school.schoolname}계좌',
                user_id=user.pk
            )
            await Trading.bulk_create([
                Trading(
                    account_id=account.pk,
                    user_id=user.pk,
                    ticker_name='TMPCORP2',
                    ticker='000001',
                    tr_type=1,
                    tr_price=1000,
                    tr_amount=100,
                    tr_date=None
                ),
                Trading(
                    account_id=account.pk,
                    user_id=user.pk,
                    ticker_name='TMPCORP',
                    ticker='111111',
                    tr_type=1,
                    tr_price=1000,
                    tr_amount=100,
                    tr_date=datetime.datetime.today()
                ),
                Trading(
                    account_id=account.pk,
                    user_id=user.pk,
                    ticker_name='TMPCORP2',
                    ticker='000001',
                    tr_type=1,
                    tr_price=1000,
                    tr_amount=100,
                    tr_date=datetime.datetime.today()
                )
            ])
        res1 = await client.get("/stocks/school-hot/6")
        res2 = await client.get("/stocks/school-hot/10")
        res_data1 = res1.json()
        res_data2 = res2.json()
        print(res_data1)
        print(res_data2)
        assert res1.status_code == 200
        assert res2.status_code == 200
        assert res_data1["message"] == "success"
        assert res_data2["message"] == "success"
        assert res_data1["stock_id"] == stock1.pk
        assert res_data1["stock_ticker"] == stock1.ticker
        assert res_data1["stock_name"] == stock1.name
        assert res_data2["stock_id"] == stock2.pk
        assert res_data2["stock_ticker"] == stock2.ticker
        assert res_data2["stock_name"] == stock2.name
