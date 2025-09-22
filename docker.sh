##############################################################################
# DOCKER
##############################################################################

docker init                                 # Docker ile ilgili başlangıç dosyalarını oluşturur
docker build -t friendlyname .              # Bu dizindeki Dockerfile'ı kullanarak image oluşturur
docker run -p 4000:80 friendlyname          # "friendlyname" image'ını çalıştırır, 4000 portunu 80'e eşler
docker run -d -p 4000:80 friendlyname       # Aynı şey, ancak detached modda
docker exec -it [container-id] bash         # Çalışan bir container'a girer
docker ps                                   # Çalışan tüm container'ların listesini gösterir
docker stop <hash>                          # Belirtilen container'ı nazikçe durdurur
docker ps -a                                # Çalışmayanlar dahil tüm container'ların listesini gösterir
docker kill <hash>                          # Belirtilen container'ı zorla kapatır
docker rm <hash>                            # Belirtilen container'ı bu makineden kaldırır
docker rm -f <hash>                         # Belirtilen container'ı zorla kaldırır
docker rm $(docker ps -a -q)                # Bu makinedeki tüm container'ları kaldırır
docker images -a                            # Bu makinedeki tüm image'ları gösterir
docker rmi <imagename>                      # Belirtilen image'ı bu makineden kaldırır
docker rmi $(docker images -q)              # Bu makinedeki tüm image'ları kaldırır
docker logs <container-id> -f               # Container'ın loglarını canlı olarak takip eder
docker login                                # Docker kimlik bilgilerinizi kullanarak CLI oturumuna giriş yapar
docker tag <image> username/repository:tag  # Registry'ye yüklemek için <image>'ı etiketler
docker push username/repository:tag         # Etiketlenmiş image'ı registry'ye yükler
docker run username/repository:tag          # Registry'den image çalıştırır
docker system prune                         # Kullanılmayan tüm container'ları, network'leri, image'ları (hem dangling hem de unreferenced) ve isteğe bağlı olarak volume'ları kaldırır. (Docker 17.06.1-ce ve üstü)
docker system prune -a                      # Sadece dangling olanlar değil, kullanılmayan tüm container'ları, network'leri, image'ları kaldırır (Docker 17.06.1-ce ve üstü)
docker volume prune                         # Kullanılmayan tüm yerel volume'ları kaldırır
docker network prune                        # Kullanılmayan tüm network'leri kaldırır


##############################################################################
# DOCKER COMPOSE
##############################################################################


docker-compose up                               # Container'ları oluşturur ve başlatır
docker-compose up -d                            # Container'ları detached modda oluşturur ve başlatır
docker-compose down                             # Container'ları, network'leri, image'ları ve volume'ları durdurur ve kaldırır
docker-compose logs                             # Container'lardan çıktıları görüntüler
docker-compose restart                          # Tüm servisleri yeniden başlatır
docker-compose pull                             # Tüm image servislerini çeker
docker-compose build                            # Tüm image servislerini oluşturur
docker-compose config                           # Compose dosyasını doğrular ve görüntüler
docker-compose scale <service_name>=<replica>   # Belirli servis(ler)i ölçeklendirir
docker-compose top                              # Çalışan işlemleri görüntüler
docker-compose run -rm -p 2022:22 web bash      # Web servisini başlatır ve bash komutunu çalıştırır, eski container'ı kaldırır.

##############################################################################
# DOCKER SERVICES 
##############################################################################


docker service create <options> <image> <command>   # Yeni servis oluşturur
docker service inspect --pretty <service_name>      # Servis(ler)in detaylı bilgilerini görüntüler
docker service ls                                   # Servisleri listeler
docker service ps                                   # Servislerin görevlerini listeler
docker service scale <service_name>=<replica>       # Belirli servis(ler)i ölçeklendirir
docker service update <options> <service_name>      # Servis seçeneklerini günceller


##############################################################################
# DOCKER STACK 
##############################################################################


docker stack ls                                 # Bu Docker host'undaki çalışan tüm uygulamaları listeler
docker stack deploy -c <composefile> <appname>  # Belirtilen Compose dosyasını çalıştırır
docker stack services <appname>                 # Bir uygulamayla ilişkili servisleri listeler
docker stack ps <appname>                       # Bir uygulamayla ilişkili çalışan container'ları listeler
docker stack rm <appname>                       # Bir uygulamayı kaldırır


##############################################################################
# DOCKER MACHINE
##############################################################################


docker-machine create --driver virtualbox myvm1                           # VM oluşturur (Mac, Win7, Linux)
docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm1  # Win10
docker-machine env myvm1                                                  # Node'unuz hakkında temel bilgileri görüntüler
docker-machine ssh myvm1 "docker node ls"                                 # Swarm'ınızdaki node'ları listeler
docker-machine ssh myvm1 "docker node inspect <node ID>"                  # Bir node'u inceler
docker-machine ssh myvm1 "docker swarm join-token -q worker"              # Join token'ı görüntüler
docker-machine ssh myvm1                                                  # VM ile SSH oturumu açar; çıkmak için "exit" yazın
docker-machine ssh myvm2 "docker swarm leave"                             # Worker'ın swarm'dan ayrılmasını sağlar
docker-machine ssh myvm1 "docker swarm leave -f"                          # Master'ın swarm'dan ayrılmasını sağlar, swarm'ı sonlandırır
docker-machine start myvm1                                                # Şu anda çalışmayan bir VM'i başlatır
docker-machine stop $(docker-machine ls -q)                               # Çalışan tüm VM'leri durdurur
docker-machine rm $(docker-machine ls -q)                                 # Tüm VM'leri ve disk image'larını siler
docker-machine scp docker-compose.yml myvm1:~                             # Dosyayı node'un home dizinine kopyalar
docker-machine ssh myvm1 "docker stack deploy -c <file> <app>"            # Bir uygulama dağıtır