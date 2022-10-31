FROM python:3.9.7
WORKDIR /var/jenkins_home/workspace/motoo/BACK_FASTAPI
ENV APP_MODULE app.app:app
COPY ./requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . . 

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]