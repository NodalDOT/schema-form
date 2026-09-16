import { RegistrationForm } from './examples/registrationForm.tsx';
import { NestedLayoutsForm } from './examples/nestedLayoutsForm.tsx';
import { ProviderOnlyForm } from './examples/providerOnlyForm.tsx';
import { RulesForm } from './examples/rulesForm.tsx';
import { ExtendedRegistryForm } from './examples/extendedRegistryForm.tsx';
import { ActionsForm } from './examples/actionsForm.tsx';

function App() {
  return (
    <>
      <h1>SchemaForm examples</h1>

      <h2>1. SchemaForm</h2>
      <RegistrationForm />

      <h2>2. Nested layouts</h2>
      <NestedLayoutsForm />

      <h2>3. SchemaFormProvider only (custom composition, no &lt;form&gt; wrapper)</h2>
      <ProviderOnlyForm />

      <h2>4. Conditional rules</h2>
      <RulesForm />

      <h2>5. Extended registry (custom control)</h2>
      <ExtendedRegistryForm />

      <h2>6. Actions (generic button, link, pending submit)</h2>
      <ActionsForm />
    </>
  )
}

export default App
