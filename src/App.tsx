import { RegistrationForm } from './examples/registrationForm.tsx';
import { NestedLayoutsForm } from './examples/nestedLayoutsForm.tsx';
import { ProviderOnlyForm } from './examples/providerOnlyForm.tsx';
import { RulesForm } from './examples/rulesForm.tsx';
import { ExtendedRegistryForm } from './examples/extendedRegistryForm.tsx';

function App() {
  return (
    <>
      <h1>SchemaForm examples</h1>

      <h2>1. SchemaForm</h2>
      <RegistrationForm />

      <h2>2. Nested layouts</h2>
      <NestedLayoutsForm />

      <h2>3. SchemaFormProvider only (custom composition)</h2>
      <ProviderOnlyForm />

      <h2>4. Conditional rules</h2>
      <RulesForm />

      <h2>5. Extended registry (custom control)</h2>
      <ExtendedRegistryForm />
    </>
  )
}

export default App
