ARG CUDA_VERSION=10.0
ARG CUDNN_VERSION=7
ARG UBUNTU_VERSION=18.04

FROM nvidia/cuda:${CUDA_VERSION}-cudnn${CUDNN_VERSION}-devel-ubuntu${UBUNTU_VERSION}

WORKDIR /vehicle_code
ARG DEBIAN_FRONTEND=noninteractive
COPY ./app /vehicle_code
COPY ./requirements.txt /code/requirements.txt
WORKDIR /
ARG PYTHON_VERSION=3.9
ARG OPENCV_VERSION=4.6.0
SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ='Asia/Kolkata'
RUN \
    apt-get update --fix-missing && \
    apt-get install -y --no-install-recommends software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-add-repository universe && \
    apt-get -y update -qq --fix-missing && \
    apt-get -y install --no-install-recommends \
        python${PYTHON_VERSION} \
        python${PYTHON_VERSION}-dev \
        $( [ ${PYTHON_VERSION%%.*} -ge 3 ] && echo "python${PYTHON_VERSION}-distutils" ) \
        wget \
    && \
    update-alternatives --install /usr/bin/python${PYTHON_VERSION%%.*} python${PYTHON_VERSION%%.*} /usr/bin/python${PYTHON_VERSION} 1 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python${PYTHON_VERSION} 1 && \
    if [[ "$PYTHON_VERSION" == "2.7" || "$PYTHON_VERSION" == "3.6" ]]; then \
        wget https://bootstrap.pypa.io/pip/$PYTHON_VERSION/get-pip.py --progress=bar:force:noscroll --no-check-certificate ; \
    else \
        apt-get -y install --no-install-recommends python${PYTHON_VERSION}-distutils ; \
        wget https://bootstrap.pypa.io/get-pip.py --progress=bar:force:noscroll --no-check-certificate ; \
    fi && \
    python${PYTHON_VERSION} get-pip.py && \
    rm get-pip.py
ENV PYTHONPATH="/usr/lib/python${PYTHON_VERSION}/site-packages:/usr/local/lib/python${PYTHON_VERSION}/site-packages"
RUN \
    apt-get -y update -qq --fix-missing && \
    apt-get -y install --no-install-recommends \
        unzip \
        cmake \
        ffmpeg \
        libtbb2 \
        gfortran \
        apt-utils \
        pkg-config \
        checkinstall \
        qt5-default \
        build-essential \
        libopenblas-base \
        libopenblas-dev \
        liblapack-dev \
        libatlas-base-dev \
        libavcodec-dev \
        libavformat-dev \
        libavutil-dev \
        libswscale-dev \
        libjpeg8-dev \
        libpng-dev \
        libtiff5-dev \
        libdc1394-22-dev \
        libxine2-dev \
        libv4l-dev \
        libgstreamer1.0 \
        libgstreamer1.0-dev \
        libgstreamer-plugins-base1.0-0 \
        libgstreamer-plugins-base1.0-dev \
        libglew-dev \
        libpostproc-dev \
        libeigen3-dev \
        libtbb-dev \
        zlib1g-dev \
        libsm6 \
        libxext6 \
        libxrender1 \
    && \
    pip${PYTHON_VERSION} install numpy && \
# Install OpenCV
    wget https://github.com/opencv/opencv/archive/${OPENCV_VERSION}.zip -O opencv.zip --progress=bar:force:noscroll --no-check-certificate && \
    unzip -q opencv.zip && \
    mv /opencv-${OPENCV_VERSION} /opencv && \
    rm opencv.zip && \
    wget https://github.com/opencv/opencv_contrib/archive/${OPENCV_VERSION}.zip -O opencv_contrib.zip --progress=bar:force:noscroll --no-check-certificate && \
    unzip -q opencv_contrib.zip && \
    mv /opencv_contrib-${OPENCV_VERSION} /opencv_contrib && \
    rm opencv_contrib.zip && \
# Prepare build
    mkdir /opencv/build && \
    cd /opencv/build && \
    cmake \
      -D CMAKE_BUILD_TYPE=RELEASE \
      -D BUILD_PYTHON_SUPPORT=ON \
      -D BUILD_DOCS=ON \
      -D BUILD_PERF_TESTS=OFF \
      -D BUILD_TESTS=OFF \
      -D CMAKE_INSTALL_PREFIX=/usr/local \
      -D OPENCV_EXTRA_MODULES_PATH=/opencv_contrib/modules \
      -D BUILD_opencv_python3=$( [ ${PYTHON_VERSION%%.*} -ge 3 ] && echo "ON" || echo "OFF" ) \
      -D BUILD_opencv_python2=$( [ ${PYTHON_VERSION%%.*} -lt 3 ] && echo "ON" || echo "OFF" ) \
      -D PYTHON${PYTHON_VERSION%%.*}_EXECUTABLE=$(which python${PYTHON_VERSION}) \
      -D PYTHON_DEFAULT_EXECUTABLE=$(which python${PYTHON_VERSION}) \
      -D BUILD_EXAMPLES=OFF \
      -D WITH_CUDA=ON \
      -D WITH_CUDNN=ON \
      -D WITH_CUBLAS=ON \
      -D WITH_IPP=ON \
      -D WITH_FFMPEG=ON \
      -D WITH_GSTREAMER=ON \
      -D WITH_V4L=ON \
      -D WITH_LIBV4L=ON \
      -D WITH_TBB=ON \
      -D WITH_QT=ON \
      -D WITH_OPENGL=ON \
      -D WITH_LAPACK=ON \
      -D ENABLE_PRECOMPILED_HEADERS=OFF \
      .. \
    && \
# Build, Test and Install
    cd /opencv/build && \
    make -j$(nproc) && \
    make install && \
    ldconfig && \
# cleaning
    apt-get -y remove \
        unzip \
        cmake \
        gfortran \
        apt-utils \
        pkg-config \
        checkinstall \
        build-essential \
        libopenblas-dev \
        liblapack-dev \
        libatlas-base-dev \
        libavcodec-dev \
        libavformat-dev \
        libavutil-dev \
        libswscale-dev \
        libjpeg8-dev \
        libpng-dev \
        libtiff5-dev \
        libdc1394-22-dev \
        libxine2-dev \
        libv4l-dev \
        libgstreamer1.0-dev \
        libgstreamer-plugins-base1.0-dev \
        libglew-dev \
        libpostproc-dev \
        libeigen3-dev \
        libtbb-dev \
        zlib1g-dev \
    && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /opencv /opencv_contrib /var/lib/apt/lists/* && \
# Call default command.
    ffmpeg -version && \
    #ldd `which ffmpeg` && \
    python --version && \
    python -c "import cv2 ; print(cv2.__version__)"
WORKDIR /vehicle_code
ENV PYTHONPATH "${PYTHONPATH}:/app/"
RUN pip uninstall numpy -y
RUN pip install numpy
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install --no-cache-dir azure-storage-blob
RUN pip install --no-cache-dir pip install python-multipart
EXPOSE 8082
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8082"]