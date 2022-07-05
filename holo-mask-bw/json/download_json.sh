# https://api.speedboat.studio/Holo-Mask--White--Black/uri/0
# 0-4444

for (( i=$1; i<=$2; i++ )); do
  url="https://api.speedboat.studio/Holo-Mask--White--Black/uri/$i"
  wget --no-cache $url
done
