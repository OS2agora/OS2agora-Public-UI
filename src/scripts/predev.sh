#!/bin/bash
ENV_FILE=./.env.local
. $ENV_FILE
THEME_ENV=./themes/.env.${THEME:-os2}

while IFS="=" read -r key value || [ -n "$key" ]; do
  # If key exist in .env.local, replace it, otherwise add it
  if grep -q $key "$ENV_FILE"; then 
    sed -i "/$key/c $key=$value" $ENV_FILE
  else
    echo "$key=$value" >> $ENV_FILE
  fi
done < $THEME_ENV
