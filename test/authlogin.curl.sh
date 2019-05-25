# curl -X POST --header "Content-Type: application/json" http://localhost:3000/auth/login -d '{"email":"i.do.prefer@gmail.com","pw":"bhavesh"}'

verb="POST"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/auth/login"

# request payload
authLoginJson=$(cat <<EOF
    {
        "email":"i.do.prefer@gmail.com",
        "pw":"bxpatel777xx"
    }
EOF
)

command="curl -X "$verb" "
command+='-H "'$contentType'" '
command+=$endPoint" "
command+="-d '"$authLoginJson"'"

echo $command
eval "$command"