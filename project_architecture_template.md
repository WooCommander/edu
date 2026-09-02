# Шаблон Архитектуры и Структуры Проекта (Vue 3 + TypeScript Strict)

Данный документ является эталонным руководством по созданию нового проекта на базе архитектуры, используемой в текущем проекте. Он описывает стек, строгую структуру папок, правила взаимодействия модулей и пошаговый план разработки.

## 1. Технологический Стек

- **Фреймворк:** Vue 3 (Composition API, `<script setup lang="ts">`)
- **Сборщик:** Vite
- **Язык:** TypeScript (Strict Mode) — полный отказ от `any` (используем `unknown` + type narrowing).
- **Стилизация:** SCSS + scoped стили.
- **База данных и Auth:** Supabase.
- **Кроссплатформенность:** Capacitor (Android / iOS).
- **Тестирование:** Vitest.

## 2. Архитектура и Структура Директорий

Проект строится на **Domain-Driven Design (DDD)** с жестко изолированными модулями.

```text
src/
  api/            # DTO (Data Transfer Objects), интерфейсы внешнего API и базовые клиенты (Supabase/Axios)
  shared/         # Общий код БЕЗ бизнес-логики (Shared Kernel)
    ui/           # Базовые UI компоненты (кнопки, инпуты, карточки, модалки)
    lib/          # Утилиты, хелперы (форматирование дат, парсеры)
    types/        # Глобальные типы, не привязанные к конкретному домену
  app/            # Оркестрация всего приложения
    services/
      app-service.ts # Главный оркестратор (связывает модули, не содержит своей бизнес-логики)
    state/        # Глобальный стейт (например, текущий авторизованный юзер, тема оформления)
  modules/        # Доменные модули (каждый автономен)
    <domain_name>/ # Например: auth, prices, profile
      adapters/   # Преобразование DTO из api/ в UI Model для UI
      services/   # Локальная бизнес-логика домена, вызовы API
      state/      # Локальный реактивный стейт домена
      ui/         # Компоненты, относящиеся только к этому домену
      index.ts    # Barrel-файл (публичный API модуля, экспорт только того, что нужно наружу)
```

## 3. Правила Взаимодействия (КРИТИЧНО)

1. **Вертикальная коммуникация в UI:** Данные спускаются вниз через `props`, события поднимаются наверх через `emits`. Горизонтальные связи между компонентами строго запрещены.
2. **Изоляция модулей:** Модули (`modules/A` и `modules/B`) **не могут** импортировать друг друга напрямую.
3. **Межмодульное взаимодействие:** Осуществляется **только** через `AppService` (`src/app/services/app-service.ts`).
   - *Пример:* `AuthService` сообщает `AppService` об успешном логине, а `AppService` вызывает обновление стейта в `ProfileState`.
4. **AppService:** Только оркестрация. В нем нет бизнес-логики, он выступает в роли "шины событий" и диспетчера.
5. **Слои данных:**
   - Данные из сети (`api`) возвращают `DTO`.
   - `adapters` обязательно преобразуют `DTO` в понятную для интерфейса `UI Model`.
   - UI работает только с `UI Model`. Никаких DTO в UI.

## 4. Пример Базового Компонента

Соблюдаем строгую типизацию, используем интерфейсы для `Props` и `Emits`.

```vue
<script setup lang="ts">
interface Props {
  title: string
  modelValue: string | null
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

function onInput(e: Event): void {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="my-component">
    <h2>{{ props.title }}</h2>
    
    <input 
      :value="props.modelValue"
      :disabled="props.isLoading"
      @input="onInput"
    />
    
    <button @click="emit('submit')" :disabled="props.isLoading">
      Отправить
    </button>
  </div>
</template>

<style scoped lang="scss">
.my-component {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
```

## 5. План Создания Нового Проекта

Чтобы запустить аналогичный проект на новую тему, следуйте этому алгоритму:

### Этап 0: Проектирование MVP
1. Определить 3-4 главные сущности нового проекта (например: Пользователь, Товар, Заказ).
2. Описать базовые роли пользователей (Гость, Авторизованный, Админ).
3. Составить список `modules`, которые потребуются на старте (например: `auth`, `catalog`, `orders`, `profile`).

### Этап 1: Инициализация
1. `npm create vite@latest new-project -- --template vue-ts`
2. Установить зависимости: `npm i vue-router supabase-js lucide-vue-next` и `npm i -D sass vitest @types/node`.
3. Очистить стандартную структуру и воссоздать папки: `api`, `shared`, `app`, `modules`.
4. Настроить `tsconfig.json` на Strict Mode (убрать все послабления для `any`).

### Этап 2: Базовая Инфраструктура
1. Подключить Supabase (создать `src/api/supabase.ts`).
2. Реализовать базовый UI-kit в `shared/ui` (кнопки, инпуты, лоадеры).
3. Создать `modules/auth` (адаптеры, сервисы логина/регистрации, UI входа).
4. Настроить `AppService` для обработки состояния авторизации.
5. Настроить роутинг (`src/router`), подключить guard по ролям.

### Этап 3: Доменная Логика
1. Для каждой сущности создать свой изолированный модуль в `modules/`.
2. Написать интерфейсы API (DTO) и чистые функции-мапперы в `adapters`.
3. Реализовать `services` для бизнес-логики.
4. Покрыть `adapters` и `services` юнит-тестами с помощью Vitest (это приоритет #1 для тестирования).
5. Разработать Dumb-компоненты в `ui/` модулей.

### Этап 4: Интеграция и Сборка
1. Настроить Capacitor (`npm i @capacitor/core` и `@capacitor/cli`), если требуется сборка под мобильные устройства (Android/iOS).
2. Реализовать заглушки (fallback UI) и обработку ошибок на уровне `AppService`.
3. Проверить консоль на наличие ошибок типизации и варнингов Vue.
