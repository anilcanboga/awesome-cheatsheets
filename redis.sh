#!/bin/bash

# *****************************************************************************
# TEMELLER
# *****************************************************************************

redis-server /path/redis.conf        # Redis'i belirtilen konfigürasyon dosyası ile başlatır
redis-cli                            # Redis istemcisi açar
sudo systemctl restart redis.service # Redis servisinin yeniden başlatılması
sudo systemctl status redis          # Redis servis durumunu kontrol eder

# *****************************************************************************
# STRİNGLER (Strings)
# *****************************************************************************

APPEND key value                  # Bir anahtara değer ekler
BITCOUNT key [start end]          # Bir stringteki set bitlerin sayısını verir
SET key value                     # Anahtarın değerini ayarlar
SETNX key value                   # Anahtar yoksa değer atar
SETRANGE key offset value         # Stringin belirli offsetinden itibaren değer yazar
STRLEN key                        # Anahtarın değerinin uzunluğunu döner
MSET key value [key value ...]    # Birden fazla anahtarı birden fazla değerle ayarlar
MSETNX key value [key value ...]  # Anahtarlar yoksa birden fazla anahtarı birden fazla değerle ayarlar
GET key                           # Anahtarın değerini alır
GETRANGE key start end            # Anahtardaki değerin belirli bir alt dizisini döner
MGET key [key ...]                # Verilen anahtarların tüm değerlerini alır
INCR key                          # Anahtarın değerini 1 artırır
INCRBY key increment              # Anahtarın değerini belirli bir miktar artırır
INCRBYFLOAT key increment         # Anahtarın float değerini belirli bir miktar artırır
DECR key                          # Anahtarın değerini 1 azaltır
DECRBY key decrement              # Anahtarın değerini belirli bir miktar azaltır
DEL key                           # Anahtarı siler
EXPIRE key 120                    # Anahtar 120 saniye sonra silinir
TTL key                           # Anahtarın silinmesine kalan süreyi saniye olarak döner

# *****************************************************************************
# LİSTELER (Lists)
# *****************************************************************************

RPUSH key value [value ...]           # Liste sonuna yeni değer ekler
RPUSHX key value                      # Liste mevcutsa sonuna değer ekler
LPUSH key value [value ...]           # Liste başına yeni değer ekler
LPUSHX key value                      # Liste mevcutsa başına değer ekler
LRANGE key start stop                 # Listenin belirli bir alt kümesini döner
LINDEX key index                      # Listenin belirli bir indeksindeki öğeyi döner
LINSERT key BEFORE|AFTER pivot value  # Listenin belirli bir öğesinin önüne veya sonrasına ekler
LLEN key                              # Listenin uzunluğunu döner
LPOP key                              # Listenin ilk öğesini çıkarır ve döner
LSET key index value                  # Listenin belirli indeksindeki öğeyi günceller
LREM key number_of_occurrences value  # Belirli sayıda öğeyi siler
LTRIM key start stop                  # Listeyi belirli aralıkla sınırlar
RPOP key                              # Listenin son öğesini çıkarır ve döner
RPOPLPUSH source destination          # Son öğeyi çıkarır, başka listeye ekler ve döner
BLPOP key [key ...] timeout           # Listenin ilk öğesini çıkarır, yoksa bloklar
BRPOP key [key ...] timeout           # Listenin son öğesini çıkarır, yoksa bloklar

# *****************************************************************************
# KÜMELER (Sets)
# *****************************************************************************

SADD key member [member ...]     # Kümeye öğe ekler
SCARD key                        # Kümenin üye sayısını döner
SREM key member [member ...]     # Kümeden öğe çıkarır
SISMEMBER key value              # Öğenin kümede olup olmadığını kontrol eder
SMEMBERS key                     # Kümenin tüm üyelerini döner
SUNION key [key ...]             # Küme birleşimi yapar
SINTER key [key ...]             # Küme kesişimi yapar
SMOVE source destination member  # Üyeyi bir kümeden diğerine taşır
SPOP key [count]                 # Rastgele öğe(ler) çıkarır ve döner

# *****************************************************************************
# SIRALI KÜMELER (Sorted Sets)
# *****************************************************************************

ZADD key [NX|XX] [CH] [INCR] score member [score member ...]  # Sıralı kümeye üye ekler veya skor günceller
ZCARD key                           # Sıralı kümedeki üye sayısını döner
ZCOUNT key min max                  # Skor aralığındaki üye sayısını döner
ZINCRBY key increment member        # Üyenin skorunu artırır
ZRANGE key start stop [WITHSCORES]  # Sıralı kümenin alt kümesini döner
ZRANK key member                    # Üyenin sırasını döner
ZREM key member [member ...]        # Üyeleri siler
ZREMRANGEBYRANK key start stop      # Belirli sıralardaki üyeleri siler
ZREMRANGEBYSCORE key min max        # Skor aralığındaki üyeleri siler
ZSCORE key member                   # Üyenin skorunu döner
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]  # Skora göre üye aralığını döner

# *****************************************************************************
# HASHLER (Hashes)
# *****************************************************************************

HGET key field          # Hash alanının değerini döner
HGETALL key             # Tüm alan ve değerleri döner
HSET key field value    # Hash alanına değer atar
HSETNX key field value  # Alan yoksa değer atar
HMSET key field value [field value ...]  # Birden fazla alanı aynı anda ayarlar
HINCRBY key field increment  # Hash alanının değerini artırır
HDEL key field [field ...]   # Bir veya birden fazla alanı siler
HEXISTS key field            # Alanın varlığını kontrol eder
HKEYS key                    # Tüm alan isimlerini döner
HLEN key                     # Hash içindeki alan sayısını döner
HSTRLEN key field            # Alan değerinin uzunluğunu döner
HVALS key                    # Tüm alan değerlerini döner

# *****************************************************************************
# HYPERLOGLOG
# *****************************************************************************

PFADD key element [element ...]  # HyperLogLog'a öğe ekler
PFCOUNT key [key ...]            # HyperLogLog içindeki benzersiz öğe sayısının tahmini
PFMERGE destkey sourcekey [sourcekey ...]  # Birden fazla HyperLogLog'u birleştirir

# *****************************************************************************
# PUB/SUB
# *****************************************************************************

PSUBSCRIBE pattern [pattern ...]             # Pattern ile eşleşen kanallardan mesaj dinler
PUBSUB subcommand [argument [argument ...]]  # Pub/Sub alt sistem durumunu kontrol eder
PUBLISH channel message                      # Kanal üzerinden mesaj yayınlar
PUNSUBSCRIBE [pattern [pattern ...]]         # Pattern ile eşleşen kanalları dinlemeyi durdurur
SUBSCRIBE channel [channel ...]              # Kanal mesajlarını dinler
UNSUBSCRIBE [channel [channel ...]]          # Kanal mesajlarını dinlemeyi durdurur

# *****************************************************************************
# DİĞER KOMUTLAR
# *****************************************************************************

KEYS pattern  # Verilen desene uyan tüm anahtarları bulur
