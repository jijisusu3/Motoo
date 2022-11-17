FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
WORKDIR /var/jenkins_home/workspace/motoo/BACK_FASTAPI
ENV APP_MODULE app.app:app
COPY ./requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . . 

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "--access-logfile", "./gunicorn-access.log", "--error-logfile", "./errors.log", "--keep-alive", "10", "-R", "app.main:app", "--bind", "0.0.0.0:8000", "--workers", "4"]
