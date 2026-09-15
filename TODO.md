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

- [ ] `item.rule = { effect: HIDE | SHOW | DISABLE | ENABLE, condition: { scope, schema } }` —
      показать/скрыть/задизейблить поле по значению другого поля (условие — кусок JSON
      Schema, проверяется через ajv на `useWatch`)



## Registry

- [ ] расширение/переопределение реестра контролов/лейаутов/действий вместо одного
      захардкоженного `baseRegistry`

- [ ] типовой вывод допустимых `scope`/`name` прямо из `const`-jsonSchema, чтобы опечатка в
      имени поля ловилась тайпчеком
