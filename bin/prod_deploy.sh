#!/bin/bash -e

if [[ -f bin/config.sh ]]
then source bin/config.sh
else
  echo "fichier bin/config.sh manquant, veuillez le créer à partir de bin/config.sh.sample"
  exit 1
fi

scp -r Dockerfile package-lock.json package.json server.js src webpack.config.js ${adresse_machine_production}:${repertoire_application}

echo "cd ${repertoire_application} && port_ecoute=${port_ecoute} && $(cat bin/deploy.sh)" | ssh ${adresse_machine_production}

