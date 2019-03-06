#!/bin/bash -e

nom_conteneur=competences-pro
nom_image_conteneur=betagouv/${nom_conteneur}
horodatage=$(date +%Y%m%d%H%M%S)
dossier_distribution=dist/${horodatage}

if [[ -z ${port_ecoute} ]]
then port_ecoute=80
fi

mkdir -p ${dossier_distribution}
cp -R package-lock.json package.json server.js config.json src webpack.config.js ${dossier_distribution}

docker build -t ${nom_image_conteneur} --build-arg dossier_source=${dossier_distribution} .

if [[ -n $(docker ps -a | grep ${nom_conteneur}) ]]
then
  docker rm -f ${nom_conteneur}
fi

docker run --name ${nom_conteneur} --detach -p ${port_ecoute}:3000 ${nom_image_conteneur}
