# https://natoboram.gitlab.io/public-gateway-cacher/
# 20220701 https://ipfs.io/ipfs/QmU8nj3AGqcW4ww7QywkRNRFLc7zvKa1GjMLVKWWdHoyvv/{0-1081}
# 20220702 https://ipfs.best-practice.se/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/{1082-1300}
# 20220703 https://cloudflare-ipfs.com/ipfs/QmSu1ALW1N9RnRuCSbigRADTqsukiRfzdkGxTNbMy72vWj/{1301-1342}
for (( i=$1; i<=$2; i++ )); do
  #url="https://ipfs.io/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/$i"
  #url="https://ipfs.best-practice.se/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/$i"
  url="https://cloudflare-ipfs.com/ipfs/QmSu1ALW1N9RnRuCSbigRADTqsukiRfzdkGxTNbMy72vWj/$i"
  wget --no-cache $url
done
