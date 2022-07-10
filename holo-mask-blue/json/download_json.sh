# https://api.speedboat.studio/HoloMaskBlue-00/uri/4444
# 0-4444

for (( i=$1; i<=$2; i++ )); do
  url="https://api.speedboat.studio/HoloMaskBlue-00/uri/$i"
  wget --no-cache $url
done
