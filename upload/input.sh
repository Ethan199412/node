------WebKitFormBoundaryJDpSdMWsTHAvWFzv
Content-Disposition: form-data; name="file"; filename="input.sh"
Content-Type: text/x-sh

read -t 30 -p "please enter your name:" name
echo $name
read -s -t 10 -p "please enter your age:" age
echo -e "\n"
echo $age
read -n 1 -t 5 -p "please enter your gender[M/F]:" gender
#echo -e "\n"
echo -e "\n$gender"

------WebKitFormBoundaryJDpSdMWsTHAvWFzv--
