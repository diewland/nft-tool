# https://natoboram.gitlab.io/public-gateway-cacher/
# range: 1-5529
# https://kasoushin.mypinata.cloud/ipfs/QmaQsekneMyHiRytQACiNXR9HnEd4tXHA8LnSZqfEGTV4P/1.json
# https://cloudflare-ipfs.com/ipfs/QmaQsekneMyHiRytQACiNXR9HnEd4tXHA8LnSZqfEGTV4P/5529.json

for (( i=$1; i<=$2; i++ )); do
  url="https://kasoushin.mypinata.cloud/ipfs/QmaQsekneMyHiRytQACiNXR9HnEd4tXHA8LnSZqfEGTV4P/$i.json"
  #url="https://cloudflare-ipfs.com/ipfs/QmaQsekneMyHiRytQACiNXR9HnEd4tXHA8LnSZqfEGTV4P/$i.json"
  wget --no-cache $url
done
