# https://natoboram.gitlab.io/public-gateway-cacher/
# 20220701 https://ipfs.io/ipfs/QmU8nj3AGqcW4ww7QywkRNRFLc7zvKa1GjMLVKWWdHoyvv/{0-1081}
# 20220702 https://ipfs.best-practice.se/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/{1082-1300}
for (( i=$1; i<=$2; i++ )); do
  #url="https://ipfs.io/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/$i"
  url="https://ipfs.best-practice.se/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/$i"
  wget --no-cache $url
done
