FROM ubuntu:20.04
FROM python:3.9.12


WORKDIR /vehicle_code

COPY ./app /vehicle_code
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

# install FreeTDS and dependencies
RUN apt-get update \
 && apt-get install unixodbc -y \
 && apt-get install unixodbc-dev -y \
 && apt-get install freetds-dev -y \
 && apt-get install freetds-bin -y \
 && apt-get install tdsodbc -y \
 && apt-get install --reinstall build-essential -y
# populate "ocbcinst.ini" as this is where ODBC driver config sits
RUN echo "[FreeTDS]\n\
Description = FreeTDS Driver\n\
Driver = /usr/lib/x86_64-linux-gnu/odbc/libtdsodbc.so\n\
Setup = /usr/lib/x86_64-linux-gnu/odbc/libtdsS.so" >> /etc/odbcinst.ini
ENV PYTHONPATH "${PYTHONPATH}:/app/"

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install --no-cache-dir pip install python-multipart
EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]

