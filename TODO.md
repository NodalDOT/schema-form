# TODO

Список пробелов между текущим движком (`src/schemaForm`) и более полной референсной
реализацией из `astro-template/src/modules/SchemaForm` (образцы её файлов лежали в `public/`,
там же и сравнивали). Не всё нужно реализовывать — это roadmap, а не обязательство.


## Контролы

- [ ] `Select`
- [ ] `CheckboxGroup`
- [ ] общий тип `Option` + `findOptionLabel` (сейчас у `Radio` свой локальный список опций)
- [ ] режим `readonly`-представления контрола (показать значение текстом, а не задизейбленный
      инпут) — отдельная ось от `disabled`/`readOnly`, которые уже есть
- [ ] валидация обязательных `props` контрола в рантайме с понятным сообщением (например,
      `Radio`/`Select` без `props.options`)

## Layouts

- [ ] `Grid` (колонки, responsive)
- [ ] `Section` (fieldset с заголовком/описанием)
- [ ] `Actions` (строка кнопок)

## Actions

- [ ] generic `button`-action: произвольный `onAction(item, { formData })`, опционально с
      валидацией формы перед вызовом
- [ ] `LinkAction` (кнопка-ссылка)
- [ ] pending-состояние для кнопок (disabled + `aria-busy` на время async-обработчика)
- [ ] кнопки как `type="button"` с ручным `handleSubmit`, чтобы форма могла жить без
      обёртки `<form>`

## Условная логика (rules)

- [x] `node.rule = { effect: HIDE | SHOW | DISABLE | ENABLE, condition: { scope, schema } }` —
      любой узел uiSchema; условие — кусок JSON Schema, компилируется ajv и кэшируется
      по ссылке на объект схемы. `Renderer` перед обычным рендером узла проверяет `rule` в
      отдельном компоненте `RuleGate` (там безусловно вызываются хуки), и по эффекту либо
      возвращает `null`, либо докидывает `disabled` тому же механизму каскадирования, что
      уже был для `readOnly`/`disabled`. Пример — `src/examples/rulesForm.tsx`

## Registry

- [ ] расширение/переопределение реестра контролов/лейаутов/действий вместо одного
      захардкоженного `baseRegistry`

- [ ] типовой вывод допустимых `scope`/`name` прямо из `const`-jsonSchema, чтобы опечатка в
      имени поля ловилась тайпчеком
