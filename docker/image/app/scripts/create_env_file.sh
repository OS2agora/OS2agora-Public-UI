
ENV_FILE=/app/.env

env |                                       # read entire environment of container
grep "^NEXT_PUBLIC_EXT" >> $ENV_FILE        # take only the variables that starts with this prefix

THEME_ENV=/app/themes/.env.${THEME}
while IFS="=" read -r key value || [ -n "$key" ]; do
  # If key exist in .env.local, replace it, otherwise add it
  if grep -q $key "$ENV_FILE"; then 
    sed -i "/$key/c $key=$value" $ENV_FILE
  else
    echo "$key=$value" >> $ENV_FILE
  fi
done < $THEME_ENV
