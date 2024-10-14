import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const environments = [
  {
    id: crypto.randomUUID(),
    name: 'Local',
    variables: {
      base_url: 'base url',
      token: 'token 1',
    },
  },
  {
    id: crypto.randomUUID(),
    name: 'Staging',
    variables: {
      base_url: 'base url',
      token: 'token 2',
    },
  },
  {
    id: crypto.randomUUID(),
    name: 'Production',
    variables: {
      base_url: 'base url',
      token: 'token 3',
    },
  },
]

export function Environments() {
  const variables = Object.keys(environments[0].variables)

  function handleAddEnvironment() { }

  function handleAddVariable() { }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <header className="flex justify-between">
        <p className="text-lg font-semibold">Environments</p>
      </header>

      <table>
        <thead>
          <tr>
            <td />

            {environments.map((environment) => (
              <td key={environment.id}>
                <Input value={environment.name} />
              </td>
            ))}

            <td>
              <Button size="icon">+</Button>
            </td>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <tr key={variable}>
              <td>
                <Input value={variable} />
              </td>

              {environments.map((environment) => (
                <td key={environment.id}>
                  <Input />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td>
              <Button size="icon">+</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
