# https://img.tofunft.com/ipfs/QmRGP7eG1htzEZnBJjAdcvNQT3ArPkfYnUqSFEtLDuBqEA/0.json
# 0-2221

for (( i=$1; i<=$2; i++ )); do
  url="https://img.tofunft.com/ipfs/QmRGP7eG1htzEZnBJjAdcvNQT3ArPkfYnUqSFEtLDuBqEA/$i.json"
  wget --user-agent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" $url
done
