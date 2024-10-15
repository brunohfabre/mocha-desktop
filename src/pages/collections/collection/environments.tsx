import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Environments() {
  const [environments, setEnvironments] = useState([
    {
      id: crypto.randomUUID(),
      name: 'Local',
    },
    {
      id: crypto.randomUUID(),
      name: 'Staging',
    },
    {
      id: crypto.randomUUID(),
      name: 'Production',
    },
  ])
  const [variables, setVariables] = useState([
    {
      id: crypto.randomUUID(),
      name: 'BASE_URL',
    },
    {
      id: crypto.randomUUID(),
      name: 'TOKEN',
    },
  ])
  const [values, setValues] = useState([
    {
      environmentId: 'env-1',
      variableId: 'var-1',
      value: 'value-1',
    },

    {
      environmentId: 'env-2',
      variableId: 'var-2',
      value: 'value-2',
    },

    {
      environmentId: 'env-3',
      variableId: 'var-1',
      value: 'value-3',
    },
  ])

  function handleAddEnvironment() {
    console.log('handle add environment')
  }

  function handleAddVariable() {
    setVariables((prevState) => [
      ...prevState,
      {
        id: crypto.randomUUID(),
        name: '',
      },
    ])
  }

  function handleChangeVariable(data: { variableId: string; value: string }) {
    console.log('handle change variable', data)
  }

  function handleChangeEnvironment(data: {
    environmentId: string
    value: string
  }) {
    console.log('handle change environment', data)
  }

  function handleChangeValue(data: any) {
    console.log('handle change value', data)
  }

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
                <Input
                  value={environment.name}
                  onChange={(event) =>
                    handleChangeEnvironment({
                      environmentId: environment.id,
                      value: event.target.value,
                    })
                  }
                />
              </td>
            ))}

            <td>
              <Button size="icon" onClick={handleAddEnvironment}>
                +
              </Button>
            </td>
          </tr>
        </thead>

        <tbody>
          {variables.map((variable) => (
            <tr key={variable.id}>
              <td>
                <Input
                  value={variable.name}
                  onChange={(event) =>
                    handleChangeVariable({
                      variableId: variable.id,
                      value: event.target.value,
                    })
                  }
                />
              </td>

              {environments.map((environment) => (
                <td key={environment.id}>
                  <Input
                    onChange={(event) =>
                      handleChangeValue({
                        environmentId: environment.id,
                        variableId: variable.id,
                        value: event.target.value,
                      })
                    }
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td>
              <Button size="icon" onClick={handleAddVariable}>
                +
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
