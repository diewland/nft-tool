# https://natoboram.gitlab.io/public-gateway-cacher/
# 20220701 https://ipfs.io/ipfs/QmU8nj3AGqcW4ww7QywkRNRFLc7zvKa1GjMLVKWWdHoyvv/{0-1081}
# 20220702 https://ipfs.best-practice.se/ipfs/QmPeKHhGizYmTerkVMTJ87zUvFo5ZikfJ7Z3GwffzHWvBn/{1082-1300}
# 20220703 https://cloudflare-ipfs.com/ipfs/QmSu1ALW1N9RnRuCSbigRADTqsukiRfzdkGxTNbMy72vWj/{1301-1342}
# 20220704 https://cloudflare-ipfs.com/ipfs/QmPZpo1AY18TR3KM42HP9iwKZ1GwJ6GovdsruRugbniGJD/{1343-1357}
# 20220705 https://ipfs.io/ipfs/QmbkNPgjhfj7B3qTAHVVBf6LauiFU4jxtQp9aBusbXCBeX/{1358-1376}
# 20220706 https://cloudflare-ipfs.com/ipfs/QmUFTMRBZSg75g6eMfERCfKCQbvjvHEkr2rWdipGjqveZj/{1377-1377}
# 20220708 https://cloudflare-ipfs.com/ipfs/Qmeo52knfLsM2TevgvSqYngsxnq4tiSeVGY6dgA6JhYqMd/{1378-1381}
# 20220709 https://cloudflare-ipfs.com/ipfs/QmUizFR1jMb2F851RT5x8EE82Cry1BwuHgpvuD4LgAaLxJ/{1382-1393}
# 20220710 https://cloudflare-ipfs.com/ipfs/QmQ5rfacYVjmeNdX2hWZsXTZrTkxhmXRs6vMvXemYMPx2R/{1394-1401}

for (( i=$1; i<=$2; i++ )); do
  url="https://cloudflare-ipfs.com/ipfs/QmQ5rfacYVjmeNdX2hWZsXTZrTkxhmXRs6vMvXemYMPx2R/$i"
  wget --no-cache $url
done
