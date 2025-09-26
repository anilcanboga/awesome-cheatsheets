/* *******************************************************************************************
 * REACT.JS CHEATSHEET
 * DOCUMENTATION: https://reactjs.org/docs/
 * FILE STRUCTURE: https://reactjs.org/docs/faq-structure.html
 * ******************************************************************************************* */


```
npm install --save react       // UI oluşturmak için bildirimsel ve esnek JavaScript kütüphanesi
npm install --save react-dom   // DOM ile ilgili render yollarının giriş noktası olarak hizmet eder
npm install --save prop-types  // React props ve benzeri nesneler için çalışma zamanı tip kontrolü
```

// notlar: komut satırlarını unutmayın


/* *******************************************************************************************
 * REACT
 * https://reactjs.org/docs/react-api.html
 * ******************************************************************************************* */


// Verilen tipte yeni bir React elementi oluşturur ve döndürür.
// JSX ile yazılan kod React.createElement() kullanmaya dönüştürülür.
// JSX kullanıyorsanız genellikle React.createElement()'i doğrudan çağırmazsınız.
React.createElement(
  type,
  [props],
  [...children]
)

// Element'i başlangıç noktası olarak kullanarak yeni bir React elementi klonlar ve döndürür.
// Sonuç elementi, yeni props'ların sığ bir şekilde birleştirildiği orijinal element'in props'larına sahip olacaktır.
React.cloneElement(
  element,
  [props],
  [...children]
)

// Nesnenin React elementi olduğunu doğrular. True veya false döndürür.
React.isValidElement(object)

React.Children  // this.props.children opak veri yapısıyla çalışmak için yardımcılar sağlar.

// Children içinde bulunan her doğrudan child üzerinde this'i thisArg olarak ayarlayarak bir fonksiyon çağırır.
React.Children.map(children, function[(thisArg)])

// React.Children.map() gibi ancak dizi döndürmez.
React.Children.forEach(children, function[(thisArg)])

// Children'daki toplam component sayısını döndürür,
// map veya forEach'e geçirilen callback'in çağrılacağı sayıya eşittir.
React.Children.count(children)

// Children'ın sadece bir child'ı (React elementi) olduğunu doğrular ve onu döndürür.
// Aksi halde bu metod bir hata fırlatır.
React.Children.only(children)

// Children opak veri yapısını her child'a atanmış anahtarlarla düz bir dizi olarak döndürür.
// Render metodlarınızda children koleksiyonlarını manipüle etmek istiyorsanız yararlıdır,
// özellikle this.props.children'ı aşağıya geçirmeden önce yeniden sıralamak veya dilimlemek istiyorsanız.
React.Children.toArray(children)

// React.Fragment component'i render() metodunda ek DOM elementi oluşturmadan birden fazla element döndürmenize izin verir
// Ayrıca <></> kısa yazım sözdizimi ile de kullanabilirsiniz.
React.Fragment


/* *******************************************************************************************
 * REACT.COMPONENT
 * React.Component is an abstract base class, so it rarely makes sense to refer to React.Component
 * directly. Instead, you will typically subclass it, and define at least a render() method.
 * https://reactjs.org/docs/react-component.html
 * ******************************************************************************************* */


class Component extends React.Component {
  // Mount edilmeden önce çağrılacak
  constructor(props) {
    // Herhangi bir başka ifadeden önce bu metodu çağırın
    // aksi halde constructor'da this.props tanımsız olacaktır
    super(props);

    // Constructor ayrıca genellikle event handler'ları sınıf örneğine bağlamak için kullanılır.
    // Bağlama, metodun this.props ve this.state gibi component özniteliklerine erişimi olduğundan emin olur
    this.method = this.method.bind(this);

    // Constructor state'i başlatmak için doğru yerdir.
    this.state = {
      active: true,

      // Nadir durumlarda, state'i props'lara dayalı olarak başlatmak uygun olabilir.
      // Bu etkili bir şekilde props'ları "çatallar" ve state'i başlangıç props'ları ile ayarlar.
      // Props'ları state için kullanarak "çatallarsanız", state'i güncel tutmak için componentWillReceiveProps(nextProps)'ı da uygulamak isteyebilirsiniz.
      // Ancak state'i yukarı kaldırmak genellikle daha kolay ve hata yapmaya daha az eğilimlidir.
      color: props.initialColor
    };
  }

  // Component state'ine değişiklikleri kuyruğa alır ve
  // React'a bu component'in ve children'ının güncellenmiş state ile yeniden render edilmesi gerektiğini söyler.
  // setState() her zaman component'i hemen güncellemez. Güncellemeyi toplu hale getirebilir veya daha sonraya erteleyebilir.
  // Bu, setState() çağrıldıktan hemen sonra this.state'i okumayı potansiyel bir tuzak haline getirir.
  // Bunun yerine, componentDidUpdate veya setState callback'i kullanın.
  // İsteğe bağlı olarak setState()'e fonksiyon yerine ilk argüman olarak bir nesne geçirebilirsiniz.
  setState(updater[, callback]) { }

  // Mount işlemi gerçekleşmeden hemen önce çağrılır (render()'dan önce)
  // Bu, sunucu render'ında çağrılan tek lifecycle hook'udur.
  componentWillMount() { }

  // Component mount edildikten hemen sonra çağrılır.
  // DOM node'ları gerektiren başlatma işlemleri buraya gitmelidir.
  // Uzak bir endpoint'ten veri yüklemeniz gerekiyorsa, ağ isteğini başlatmak için iyi bir yerdir.
  // Bu metod herhangi bir abonelik kurmak için iyi bir yerdir. Bunu yaparsanız, componentWillUnmount()'da aboneliği iptal etmeyi unutmayın.
  componentDidMount() { }

  // Mount edilmiş bir component yeni props'ları almadan önce çağrılır.
  // Prop değişikliklerine yanıt olarak state'i güncellemeniz gerekiyorsa (örneğin, sıfırlamak için),
  // bu metodda this.props ve nextProps'ı karşılaştırabilir ve this.setState() kullanarak state geçişleri gerçekleştirebilirsiniz.
  componentWillReceiveProps(nextProps) { }

  // React'a bir component'in çıktısının mevcut state veya props değişikliğinden etkilenip etkilenmediğini bildirin.
  // Varsayılan davranış her state değişikliğinde yeniden render etmektir ve büyük çoğunlukla varsayılan davranışa güvenmelisiniz.
  // shouldComponentUpdate() yeni props veya state alınırken render'dan önce çağrılır. Varsayılan olarak true'dur.
  // Bu metod ilk render için veya forceUpdate() kullanıldığında çağrılmaz.
  // False döndürmek, child component'lerin state'leri değiştiğinde yeniden render edilmesini engellemez.
  shouldComponentUpdate(nextProps, nextState) { }

  // Yeni props veya state alınırken render'dan hemen önce çağrılır.
  // Bunu bir güncelleme gerçekleşmeden önce hazırlık yapmak için fırsat olarak kullanın. Bu metod ilk render için çağrılmaz.
  // Burada this.setState() çağıramayacağınızı unutmayın; ayrıca componentWillUpdate() dönmeden önce
  // (örneğin Redux action dispatch etmek gibi) React component'ini güncelleyecek başka bir şey de yapmamalısınız.
  // Props değişikliklerine yanıt olarak state'i güncellemeniz gerekiyorsa, bunun yerine componentWillReceiveProps() kullanın.
  componentWillUpdate(nextProps, nextState) { }

  // Güncelleme gerçekleştikten hemen sonra çağrılır. Bu metod ilk render için çağrılmaz.
  // Component güncellendiğinde DOM üzerinde işlem yapmak için bunu fırsat olarak kullanın.
  // Mevcut props'ları önceki props'larla karşılaştırdığınız sürece ağ istekleri yapmak için de iyi bir yerdir (örneğin props değişmemişse ağ isteği gerekli olmayabilir).
  componentDidUpdate(prevProps, prevState) { }

  // Component unmount edilmeden ve yok edilmeden hemen önce çağrılır.
  // Bu metodda gerekli temizlik işlemlerini gerçekleştirin, örneğin zamanlayıcıları geçersiz kılma, ağ isteklerini iptal etme,
  // veya componentDidMount()'da oluşturulan abonelikleri temizleme.
  componentWillUnmount() { }

  // Error boundary'ler, child component ağacında herhangi bir yerde JavaScript hatalarını yakalayan,
  // bu hataları loglayan ve çöken component ağacı yerine yedek UI gösteren React component'leridir.
  // Error boundary'ler render sırasında, lifecycle metodlarında ve altlarındaki tüm ağacın constructor'larında hataları yakalar.
  componentDidCatch() { }

  // Bu metod gereklidir.
  // Saf olmalıdır, yani component state'ini değiştirmemeli,
  // her çağrıldığında aynı sonucu döndürmeli ve
  // tarayıcıyla doğrudan etkileşime girmemelidir (bunun için lifecycle metodlarını kullanın)
  // Şu tiplerden birini döndürmelidir: react elementleri, string ve sayılar, portaller, null veya boolean'lar.
  render() {
    // Bu component'i çağıran tarafından tanımlanan props'ları içerir.
    console.log(this.props);

    // Zamanla değişebilen bu component'e özel verileri içerir.
    // State kullanıcı tanımlıdır ve düz bir JavaScript nesnesi olmalıdır.
    // render()'da kullanmıyorsanız, state'de olmamalıdır.
    // Örneğin, zamanlayıcı ID'lerini doğrudan instance'a koyabilirsiniz.
    // this.state'i asla doğrudan değiştirmeyin, çünkü sonrasında setState() çağırmak yaptığınız değişikliği değiştirebilir.
    // this.state'i değişmezmiş gibi davranın.
    console.log(this.state);

    return (
      <div>
        {/* Yorum buraya gider */}
        Hello, {this.props.name}!
      </div>
    );
  }
}

// Sınıf için varsayılan props'ları ayarlamak üzere component sınıfının kendisinde bir özellik olarak tanımlanabilir.
// Bu tanımsız props'lar için kullanılır, ancak null props'lar için değil.
Component.defaultProps = {
  color: 'blue'
};

component = new Component();

// Varsayılan olarak, component'inizin state'i veya props'ları değiştiğinde, component'iniz yeniden render edilecektir.
// render() metodunuz başka bir veriye bağlıysa, forceUpdate() çağırarak React'a component'in yeniden render edilmesi gerektiğini söyleyebilirsiniz.
// Normalde forceUpdate() kullanımından kaçınmaya çalışmalı ve render()'da sadece this.props ve this.state'den okumalısınız.
component.forceUpdate(callback)


/* *******************************************************************************************
 * REACT.DOM
 * The react-dom package provides DOM-specific methods that can be used at the top level of
 * your app and as an escape hatch to get outside of the React model if you need to.
 * Most of your components should not need to use this module.
 * https://reactjs.org/docs/react-dom.html
 * ******************************************************************************************* */


// React elementini sağlanan container'daki DOM'a render eder ve component'e bir referans döndürür
// (veya state'siz component'ler için null döndürür).
ReactDOM.render(element, container[, callback])

// render() ile aynı, ancak HTML içeriği ReactDOMServer tarafından render edilmiş bir container'ı hydrate etmek için kullanılır.
// React mevcut işaretlemeye event listener'ları eklemeye çalışacaktır.
ReactDOM.hydrate(element, container[, callback])

// Mount edilmiş React component'ini DOM'dan kaldırır ve event handler'larını ve state'ini temizler.
// Container'da hiç component mount edilmemişse, bu fonksiyonu çağırmak hiçbir şey yapmaz.
// Component unmount edildiyse true, unmount edilecek component yoksa false döndürür.
ReactDOM.unmountComponentAtNode(container)

// Bu component DOM'a mount edilmişse, karşılık gelen yerel tarayıcı DOM elementini döndürür.
// Bu metod DOM'dan değerleri okumak için yararlıdır, örneğin form alanı değerleri ve DOM ölçümleri yapmak.
// Çoğu durumda, DOM node'una bir ref ekleyebilir ve findDOMNode kullanmaktan tamamen kaçınabilirsiniz.
ReactDOM.findDOMNode(component)

// Portal oluşturur. Portal'lar children'ı DOM component'inin hiyerarşisinin dışında var olan bir DOM node'una render etmenin bir yolunu sağlar.
ReactDOM.createPortal(child, container)


/* *******************************************************************************************
 * REACTDOMSERVER
 * The ReactDOMServer object enables you to render components to static markup.
 * https://reactjs.org/docs/react-dom.html
 * ******************************************************************************************* */


// React elementini başlangıç HTML'ine render eder. React bir HTML string'i döndürecektir.
// Bu metodu sunucuda HTML oluşturmak ve daha hızlı sayfa yüklemeleri için başlangıç isteğinde işaretlemeyi göndermek
// ve arama motorlarının SEO amaçlı sayfalarınızı taramasına izin vermek için kullanabilirsiniz.
ReactDOMServer.renderToString(element)

// renderToString'e benzer, ancak React'ın dahili olarak kullandığı data-reactroot gibi ekstra DOM öznitelikleri oluşturmaz.
// React'ı basit statik sayfa oluşturucu olarak kullanmak istiyorsanız yararlıdır, çünkü ekstra öznitelikleri kaldırmak bazı bayt tasarrufu sağlayabilir.
ReactDOMServer.renderToStaticMarkup(element)

// React elementini başlangıç HTML'ine render eder. HTML string'i çıktı veren okunabilir stream döndürür.
// Bu stream tarafından çıktı verilen HTML, ReactDOMServer.renderToString'in döndüreceği ile tamamen eşittir.
// Bu metodu sunucuda HTML oluşturmak ve daha hızlı sayfa yüklemeleri için başlangıç isteğinde işaretlemeyi göndermek
// ve arama motorlarının SEO amaçlı sayfalarınızı taramasına izin vermek için kullanabilirsiniz.
ReactDOMServer.renderToNodeStream(element)

// renderToNodeStream'e benzer, ancak React'ın dahili olarak kullandığı data-reactroot gibi ekstra DOM öznitelikleri oluşturmaz.
// React'ı basit statik sayfa oluşturucu olarak kullanmak istiyorsanız yararlıdır, çünkü ekstra öznitelikleri kaldırmak bazı bayt tasarrufu sağlayabilir.
ReactDOMServer.renderToStaticNodeStream(element)


/* *******************************************************************************************
 * TYPECHECKING WITH PROPTYPES
 * https://reactjs.org/docs/typechecking-with-proptypes.html
 * ******************************************************************************************* */


import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Bir prop'un belirli bir JS tipi olduğunu bildirebilirsiniz. Varsayılan olarak bunlar
  // hepsi isteğe bağlıdır.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Render edilebilecek herhangi bir şey: sayılar, string'ler, elementler veya bu tipleri içeren
  // bir dizi (veya fragment).
  optionalNode: PropTypes.node,

  // Bir React elementi.
  optionalElement: PropTypes.element,

  // Ayrıca bir prop'un bir sınıfın örneği olduğunu da bildirebilirsiniz. Bu JS'nin
  // instanceof operatörünü kullanır.
  optionalMessage: PropTypes.instanceOf(Message),

  // Prop'unuzun belirli değerlerle sınırlı olduğundan emin olmak için
  // onu enum olarak ele alabilirsiniz.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Birçok tipten biri olabilecek bir nesne
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Belirli tipte bir dizi
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Belirli tipte özellik değerlerine sahip bir nesne
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Belirli bir şekil alan bir nesne
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // Prop sağlanmazsa uyarı gösterildiğinden emin olmak için yukarıdakilerden herhangi birini
  // `isRequired` ile zincirleyebilirsiniz.
  requiredFunc: PropTypes.func.isRequired,

  // Herhangi bir veri tipinin değeri
  requiredAny: PropTypes.any.isRequired,

  // Ayrıca özel bir validator da belirtebilirsiniz. Doğrulama başarısız olursa Error
  // nesnesi döndürmelidir. `console.warn` veya throw yapmayın, çünkü bu
  // `oneOfType` içinde çalışmayacaktır.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // Ayrıca `arrayOf` ve `objectOf`'a özel validator da sağlayabilirsiniz.
  // Doğrulama başarısız olursa Error nesnesi döndürmelidir. Validator
  // dizideki veya nesnedeki her anahtar için çağrılacaktır. Validator'ın ilk iki
  // argümanı dizi veya nesnenin kendisi ve mevcut öğenin anahtarıdır.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};