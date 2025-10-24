# To-Do App (React + TypeScript + Redux Toolkit)

Bu proje, **Vite** ile oluşturulmuş, **React** ve **TypeScript** tabanlı bir To-Do (Yapılacaklar Listesi) uygulamasıdır. Uygulamanın state yönetimi için **Redux Toolkit** kullanılmıştır.

## Teknoloji Mimarisi

* **UI Kütüphanesi:** React
* **Geliştirme Ortamı:** Vite
* **Dil:** TypeScript
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Ikonlar:** React Icons (`react-icons`)
* **Styling:** Standart CSS (`App.css`, `src/css/Todo.css`)

## Özellikler (Features)

Uygulama, temel CRUD (Create, Read, Update, Delete) operasyonlarını desteklemektedir:

* **Todo Ekleme (Create):** Kullanıcılar bir input alanına yeni bir görev girip listeye ekleyebilir.
* **Todo Listeleme (Read):** Eklenen tüm görevler liste halinde görüntülenir.
* **Todo Güncelleme (Update):** Her bir görev, "düzenle" butonuna tıklandığında inline olarak (yerinde) güncellenebilir.
* **Todo Silme (Delete):** Her bir görev, "sil" butonu ile listeden kaldırılabilir.

## Proje Yapısı ve State Yönetimi

Proje, state yönetimi için Redux Toolkit'in "slice" yapısını kullanır. Component'ler ve Redux arasındaki akış şu şekildedir:

### 1. Redux Store ve Slice

* `src/redux/store.tsx`:
    * `configureStore` kullanılarak Redux store'u oluşturulur.
    * `todoSlice`'tan gelen `todoReducer` burada ana reducer olarak bağlanır.

* `src/redux/todoSlice.tsx`:
    * Uygulamanın ana state mantığı burada yer alır. `createSlice` ile bir "dilim" oluşturulur.
    * **Initial State:** `todos: []` (boş bir todo dizisi) olarak tanımlanmıştır.
    * **Reducers:**
        * `createTodo`: State'e yeni bir todo objesi (`action.payload`) ekler.
        * `removeTodoById`: `id`'si `action.payload` ile eşleşen todo'yu listeden filtreler.
        * `updateTodo`: `id`'si eşleşen todo'yu `action.payload`'daki yeni obje ile değiştirir.

### 2. Component Mimarisi

* `src/main.tsx`:
    * Uygulamanın giriş noktasıdır.
    * Redux `Provider`'ı ile tüm `App` component'ini sararak state'in global olarak erişilebilir olmasını sağlar.

* `src/App.tsx`:
    * Ana layout component'idir.
    * `<TodoCreate />` (yeni todo ekleme formu) ve `<TodoList />` (todo listesi) component'lerini render eder.

* `src/components/TodoCreate.tsx`:
    * Yeni todo metni için bir `useState` (`newTodo`) tutar.
    * `useDispatch` hook'u ile Redux'a bağlanır.
    * "Oluştur" butonuna tıklandığında, (boş kontrolü yaptıktan sonra) rastgele bir `id` ve `newTodo` içeriği ile bir `payload` oluşturur ve `createTodo` action'ını dispatch eder.

* `src/components/TodoList.tsx`:
    * `useSelector` hook'u ile Redux state'indeki `todos` dizisine abone olur.
    * `todos` dizisi üzerinde `map` işlemi yaparak her bir todo item'ı için bir `<Todo />` component'i render eder.

* `src/components/Todo.tsx`:
    * Tek bir todo item'ının gösterilmesinden ve yönetilmesinden sorumludur.
    * `todoProps` ile todo objesini alır.
    * `useDispatch` hook'unu kullanır.
    * "Edit" (düzenleme) modu için `editable` adında lokal bir `useState` tutar.
    * `CiCircleRemove` (Sil) ikonuna tıklandığında `removeTodoById` action'ını dispatch eder.
    * `CiEdit` (Düzenle) ikonuna tıklandığında `editable` state'ini `true` yapar ve input gösterir.
    * `FaCheck` (Onayla) ikonuna tıklandığında `updateTodo` action'ını yeni içerikle dispatch eder ve "edit" modundan çıkar.

## Kurulum ve Çalıştırma

1.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```
2.  Projeyi geliştirme modunda başlatın:
    ```bash
    npm run dev
    ```
3.  Production build'u almak için:
    ```bash
    npm run build
    ```
