import pytest
from httpx import AsyncClient

from app.main import app


# @pytest.mark.anyio
# async def test_signup_success(client: AsyncClient):
#     # When: username, password로 회원가입을 성공했을 때
#     res = await client.post("/example/signup", json={"username": 'username', "password": 'password'})
#
#     # Then: 성공을 응답
#     res_data = res.json()
#     assert res_data["message"] == "success"
#
#
# @pytest.mark.anyio
# async def test_signup_failed(client: AsyncClient):
#     #Given
#     user, created = await User.get_or_create(username="username2", password="password")
#     print(user, created)
#     # When: username, password 등 이미 있는 아이디로 회원가입을 시도했을 때
#     res = await client.post("/example/signup", json={"username": 'username2', "password": 'password'})
#     print(res)
#     # Then: 실패 응답
#     res_data = res.json()
#     print(res_data)
#     assert res_data["detail"] == "실패"

#
# @pytest.mark.asyncio
# async def test_login_should_be_failed(async_client):
#     await User.create(username="username", password="password")
#     # When: 유저로 로그인을 했을 때
#     res = await async_client.post("/examples/login", json={"username": 'username', "password": 'password'})
#
#     # Then: 실패를 응답하고
#     res_data = res.json()
#     assert res_data["message"] == "success"

#
# @pytest.mark.asyncio
# async def test_trivial():
#     assert True

# @pytest.mark.anyio
# async def test_get_article_detail():
#     async with AsyncClient(app=app, base_url="http://test") as ac:
#         response = await ac.get("/examples/7")
#     assert response.status_code == 200
#     assert response.json() == {"message": "Tomato"}