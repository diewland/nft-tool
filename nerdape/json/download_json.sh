# https://natoboram.gitlab.io/public-gateway-cacher/
# 20220701 https://ipfs.io/ipfs/QmU8nj3AGqcW4ww7QywkRNRFLc7zvKa1GjMLVKWWdHoyvv/{0-1081}
# 20220702 https://ipfs.best-practice.se/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/{1082-1300}
# 20220703 https://cloudflare-ipfs.com/ipfs/QmSu1ALW1N9RnRuCSbigRADTqsukiRfzdkGxTNbMy72vWj/{1301-1342}
# 20220704 https://cloudflare-ipfs.com/ipfs/QmPZpo1AY18TR3KM42HP9iwKZ1GwJ6GovdsruRugbniGJD/{1343-1357}
# 20220705 https://ipfs.io/ipfs/QmbkNPgjhfj7B3qTAHVVBf6LauiFU4jxtQp9aBusbXCBeX/{1358-1376}
# 20220706 https://cloudflare-ipfs.com/ipfs/QmUFTMRBZSg75g6eMfERCfKCQbvjvHEkr2rWdipGjqveZj/{1377-1377}

for (( i=$1; i<=$2; i++ )); do
  url="https://cloudflare-ipfs.com/ipfs/QmUFTMRBZSg75g6eMfERCfKCQbvjvHEkr2rWdipGjqveZj/$i"
  wget --no-cache $url
done
