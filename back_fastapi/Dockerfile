FROM python:3.9.7
WORKDIR /var/jenkins_home/workspace/motoo/BACK_FASTAPI
COPY ./requirements.txt /var/jenkins_home/workspace/motoo/BACK_FASTAPI/requirements.txt
RUN pip install --no--cache-dir --upgrade -r /var/jenkins_home/workspace/motoo/BACK_FASTAPI/requirements.txt
COPY ./app /var/jenkins_home/workspace/motoo/BACK_FASTAPI/app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]