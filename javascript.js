/* *******************************************************************************************
 * GLOBAL OBJECTS > OBJECT
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 * ******************************************************************************************* */

// Global object: özellikler
Object.length                                        // length bir function object özelliğidir ve fonksiyonun beklediği argüman sayısını belirtir (yani formal parametre sayısı). rest parameter dahil değildir. Varsayılan değeri 1’dir.
Object.prototype                                     // Object prototype nesnesini temsil eder ve tüm Object türündeki nesnelere yeni özellikler ve metotlar eklemeye olanak tanır.

// Object constructor metodları
Object.assign(target, ...sources)                    // Bir veya birden fazla source object içindeki enumerable own property’lerin değerlerini target object’e kopyalar. Target object’i döndürür.
Object.create(MyObject)                              // Belirtilen prototype object ve özelliklerle yeni bir object oluşturur. Yeni oluşturulan object’in prototipi olarak kullanılacak nesneyi belirtir.
Object.defineProperty(obj, prop, descriptor)         // Belirtilen descriptor ile bir property’yi obj’ye ekler.
Object.defineProperties(obj, props)                  // Birden fazla property’yi verilen descriptor’lerle obj’ye ekler.
Object.entries(obj)                                  // Obj’nin enumerable string property’lerinden oluşan [key, value] çiftlerini içeren bir array döndürür.
Object.freeze(obj)                                   // Objeyi dondurur: başka kodlar property’leri silemez veya değiştiremez.
Object.getOwnPropertyDescriptor(obj, prop)           // Obj üzerindeki belirtilen property için descriptor döndürür.
Object.getOwnPropertyDescriptors(obj)                // Obj üzerindeki tüm property descriptor’lerini içeren bir object döndürür.
Object.getOwnPropertyNames(obj)                      // Obj’nin tüm enumerable ve non-enumerable property adlarını içeren bir array döndürür.
Object.getOwnPropertySymbols(obj)                    // Obj üzerinde tanımlı tüm symbol property’lerini döndürür.
Object.getPrototypeOf(obj)                           // Obj’nin prototype’ini döndürür.
Object.is(value1, value2);                           // İki değerin aynı olup olmadığını karşılaştırır. Tüm NaN değerlerini eşit kabul eder (== veya === davranışından farklıdır).
Object.isExtensible(obj)                             // Obj’nin genişletilebilir olup olmadığını belirler.
Object.isFrozen(obj)                                 // Obj’nin dondurulmuş olup olmadığını belirler.
Object.isSealed(obj)                                 // Obj’nin sealed olup olmadığını belirler.
Object.keys(obj)                                     // Obj’nin enumerable string property adlarını içeren bir array döndürür.
Object.preventExtensions(obj)                        // Obj’nin genişletilmesini engeller.
Object.seal(obj)                                     // Obj’nin property’lerinin silinmesini engeller (ama mevcut değerler değiştirilebilir).
Object.setPrototypeOf(obj, prototype)                // Obj’nin prototype’ini (içsel [[Prototype]] özelliğini) ayarlar.
Object.values(obj)                                   // Obj’nin enumerable string property değerlerini içeren bir array döndürür.

// Object instance’ları ve Object prototype object (Object.prototype.property veya Object.prototype.method())
// Özellikler
obj.constructor                                      // Obj’nin prototype’ini oluşturan fonksiyonu belirtir.
obj.__proto__                                        // Obj oluşturulurken kullanılan prototype’e işaret eder.

// Metotlar
obj.hasOwnProperty(prop)                             // Obj’nin belirtilen property’yi doğrudan içerip içermediğini (prototype zincirinden miras almadığını) boolean olarak döndürür.
prototypeObj.isPrototypeOf(object)                   // Belirtilen object’in prototype zincirinde bu prototypeObj olup olmadığını boolean olarak döndürür.
obj.propertyIsEnumerable(prop)                       // Property’nin [[Enumerable]] özniteliğinin ayarlı olup olmadığını boolean döndürür.
obj.toLocaleString()                                 // toString() çağırır.
obj.toString()                                       // Obj’nin string gösterimini döndürür.
object.valueOf()                                     // Obj’nin primitive değerini döndürür.

/* *******************************************************************************************
 * GLOBAL OBJECTS > ARRAY
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * ******************************************************************************************* */

// Global object: özellikler
Array.length                                         // Array içindeki element sayısını yansıtır.
Array.prototype                                      // Array constructor için prototype’i temsil eder, tüm Array object’lerine yeni özellikler ve metotlar eklenmesine olanak tanır.

// Global object: metodlar
Array.from(arrayLike[, mapFn[, thisArg]])            // Array-like veya iterable bir objeden yeni bir Array instance oluşturur.
Array.isArray(obj)                                   // Bir değişken array ise true, değilse false döndürür.
Array.of(element0[, element1[, ...[, elementN]]])    // Argüman sayısı ve tipi fark etmeksizin yeni bir Array instance oluşturur.

// Instance: özellikler
arr.length                                           // Array’deki eleman sayısını yansıtır.

// Instance: mutator metodları
arr.copyWithin(target, start, end)                   // Array içindeki bir alt diziyi kopyalayıp başka bir konuma yazar.
arr.fill(value, start, end)                          // start ve end indexleri arasındaki tüm elementleri value ile doldurur.
arr.pop()                                            // Array’in son elementini siler ve o elementi döndürür.
arr.flat()                                           // İç içe array’leri tek seviyeli bir array haline getirir.
arr.push([element1[, ...[, elementN]]])              // Array’in sonuna bir veya daha fazla element ekler, yeni length’i döndürür.
arr.reverse()                                        // Array’in elemanlarını ters çevirir (ilk son, son ilk olur).
arr.shift()                                          // Array’in ilk elementini siler ve o elementi döndürür.
arr.sort()                                           // Array’i yerinde sıralar ve array’i döndürür.
array.splice(start, deleteCount, item1, item2, ...)  // Array’den eleman siler ve/veya yeni eleman ekler.
arr.unshift([element1[, ...[, elementN]]])           // Array’in başına bir veya daha fazla element ekler, yeni length’i döndürür.

// Instance: accessor metodları
arr.at(index)                                        // Belirtilen index’teki elementi döndürür.
arr.concat(value1[, value2[, ...[, valueN]]])        // Array’i başka array(ler) ve/veya value(lar) ile birleştirerek yeni bir array döndürür.
arr.includes(searchElement, fromIndex)               // Array içinde belirtilen element var mı diye kontrol eder, true/false döndürür.
arr.indexOf(searchElement[, fromIndex])              // Belirtilen elementin ilk index’ini döndürür, yoksa -1 döner.
arr.join(separator)                                  // Array’deki tüm elementleri string’e dönüştürür ve separator ile birleştirir.
arr.lastIndexOf(searchElement, fromIndex)            // Belirtilen elementin son index’ini döndürür, yoksa -1 döner.
arr.slice(begin, end)                                // Array’in bir kısmını çıkarır ve yeni bir array döndürür.
arr.toString()                                       // Array’in string gösterimini döndürür. (Object.prototype.toString() metodunu override eder.)
arr.toLocaleString(locales, options)                 // Array’in localized string gösterimini döndürür. (Object.prototype.toLocaleString() metodunu override eder.)

// Instance: iteration metodları
arr.entries()                                        // Array’in [key, value] çiftlerini içeren bir Array Iterator objesi döndürür.
arr.every(callback[, thisArg])                       // Tüm elementler callback testini geçerse true döner.
arr.filter(callback[, thisArg])                      // Callback true döndürdüğü elementlerle yeni bir array oluşturur.
arr.find(callback[, thisArg])                        // Testi geçen ilk element değerini döndürür, yoksa undefined.
arr.findIndex(callback[, thisArg])                   // Testi geçen ilk elementin index’ini döndürür, yoksa -1.
arr.forEach(callback[, thisArg])                     // Array’deki her element için callback fonksiyonu çalıştırır.
arr.keys()                                           // Array’in index değerlerini içeren bir Array Iterator döndürür.
arr.map(callback[, initialValue])                    // Tüm elementlere callback uygulayarak yeni bir array oluşturur.
arr.reduce(callback[, initialValue])                 // Accumulator ve her element üzerinde callback çalıştırarak tek bir değer döndürür (soldan sağa).
arr.reduceRight(callback[, initialValue])            // Accumulator ve her element üzerinde callback çalıştırarak tek bir değer döndürür (sağdan sola).
arr.some(callback[, initialValue])                   // En az bir element callback testini geçerse true döndürür.
arr.values()                                         // Array’in value’larını içeren bir Array Iterator döndürür.
