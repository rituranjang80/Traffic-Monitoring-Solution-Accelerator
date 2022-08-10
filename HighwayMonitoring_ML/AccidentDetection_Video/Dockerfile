FROM ubuntu:20.04
FROM python:3.7-slim-buster
RUN apt-get update
RUN apt-get install -y build-essential python3.7 python3-pip python3.7-venv
RUN apt-get update
RUN ln -s usr/bin/python3.7.6 usr/bin/python


WORKDIR /accident_code

COPY ./app /accident_code
COPY ./requirements.txt /code/requirements.txt
RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    libkrb5-dev \
    libsm6 \
    libxext6 \
    ffmpeg \
    libfontconfig1 \
    libxrender1 \
    libgl1-mesa-glx && \
    rm -rf /var/lib/apt/lists/*
ENV PYTHONPATH "${PYTHONPATH}:/app/"

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install --no-cache-dir pip install python-multipart
RUN pip install typing-extensions --upgrade
EXPOSE 8083

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8083"]