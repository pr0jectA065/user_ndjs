
verb="PUT"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/resetpw"

# header
appContext="http://gotestli.com/"

# request payload
userMeta=$(cat <<EOF
    {
        "email":"i.do.prefer@gmail.com",
        "pw":"bxpatel999"
    }
EOF
)

command="curl -X "$verb" "
#command+="-i "
command+='-H "'$contentType'" '
command+='-H "appContext:'
command+=$appContext'" '
command+=$endPoint" "
command+="-d '"$userMeta"'"

echo $command
eval "$command"
