#!/bin/bash

chmod 644 /etc/cron.d/root
chown root:root /etc/cron.d/root

cron
2,4,6,8 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks
12,14,16,18 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks
22,24,26,28 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks
32,34,36,38 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks
42,44,46,48 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks
52,54,56,58 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks
*/10 09-14 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks-with-time
00 15 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands market update-stocks-with-time
00 08 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands daily get-token
00 08 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands daily get-token --token-use get_bidask
10 08 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands daily update-stock-detail
30 21 * * 1-5 docker exec -it motoo_fastapi_container python -m app.commands daily daily-insert
17 08 * * * docker exec -it motoo_fastapi_container python -m app.commands daily category-key
19 08 * * * docker exec -it motoo-fastapi-container python -m app.commands daily category-sent
28 08 * * * docker exec -it motoo-fastapi-container python -m app.commands daily company-key
30 08 * * * docker exec -it motoo-fastapi-container python -m app.commands daily company-sent
