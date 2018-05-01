FROM ubuntu:14.04
MAINTAINER KINOSHITA minoru <5021543+minoruta@users.noreply.github.com>

ARG VERSION_PJSIP=2.7.2
ARG NODEJS=10
ARG VERSION_LIBSRTP=2.1.0

#
#   Prepare requirments to test
#
RUN apt -qq update \
&&  apt -qq install -y software-properties-common \
&&  add-apt-repository ppa:ubuntu-toolchain-r/test \
&&  apt -qq update \
&&  apt -qq install -y \
        wget \
        pkg-config \
        build-essential \
        python \
        curl \
        git \
        gcc-4.9 \
        g++-4.9 \
        vim \
        gdb \
&&  curl -sL https://deb.nodesource.com/setup_$NODEJS.x | sudo -E bash - \
&&  apt -qq install -y nodejs \
&&  npm install -g node-gyp \
&&  apt-get clean \
&&  rm -rf /var/lib/apt/lists/* \
&&  update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.9

#
#   Prepare strp for pjsip
#
WORKDIR /root
RUN wget https://github.com/cisco/libsrtp/archive/v$VERSION_LIBSRTP.tar.gz \
&&  tar xzf v$VERSION_LIBSRTP.tar.gz \
&&  rm v$VERSION_LIBSRTP.tar.gz \
&&  cd libsrtp-$VERSION_LIBSRTP \
&&  ./configure > /dev/null \
&&  make \
&&  make install \
&&  make clean \
&&  ldconfig \
&&  cd ..

#
#   Prepare PJSIP
#
RUN wget -nv "http://www.pjsip.org/release/$VERSION_PJSIP/pjproject-$VERSION_PJSIP.tar.bz2" -O - | tar xjf - \
&&  cd pjproject-$VERSION_PJSIP \
&&  ./configure \
  --with-external-srtp \
  --enable-shared \
  --disable-sound \
  --disable-oss \
  --disable-sdl \
  --disable-speex-aec \
  --disable-video \
  > /dev/null \
&& make dep all \
&& make install \
&& make clean \
&& ldconfig

#
#   Test
#
CMD cd sipster.ts \
&&  npm -qq install --unsafe-perm \
&&  ulimit -c unlimited \
&&  npm test
