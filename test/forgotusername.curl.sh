verb="GET"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/retrieveuser"

# request payload
userMeta=$(cat <<EOF
    {
        "email":"i.do.prefer@gmail.com"
    }
EOF
)

command="curl -X "$verb" "
command+='-H "'$contentType'" '
command+=$endPoint" "
command+="-d '"$userMeta"'"

echo $command
eval "$command"