# curl -X POST --header "Content-Type: application/json" http://localhost:3000/auth/login -d '{"email":"i.do.prefer@gmail.com","pw":"bhavesh"}'


verb="POST"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/auth/reg"

# request payload
authLoginJson=$(cat <<EOF
    {
        "email":"i.do.prefer@gmail.com",
        "pw":"bhavesh"
    }
EOF
)

command="curl -X "$verb" "
command+='-H "'$contentType'" '
command+=$endPoint" "
command+="-d '"$authLoginJson"'"

echo $command
eval "$command"