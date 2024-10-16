import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Environments() {
  const [environments, setEnvironments] = useState([
    {
      id: 'env-1',
      name: 'Local',
    },
    {
      id: 'env-2',
      name: 'Staging',
    },
    {
      id: 'env-3',
      name: 'Production',
    },
  ])
  const [variables, setVariables] = useState([
    {
      id: 'var-1',
      name: 'BASE_URL',
    },
    {
      id: 'var-2',
      name: 'TOKEN',
    },
  ])
  const [values, setValues] = useState<Record<string, string>>({
    'env-1-var-1': 'value-1',
  })

  function handleAddEnvironment() {
    setEnvironments((prevState) => [
      ...prevState,
      {
        id: crypto.randomUUID(),
        name: '',
      },
    ])
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

  function handleChangeVariable({
    variableId,
    value,
  }: {
    variableId: string
    value: string
  }) {
    setVariables((prevState) =>
      prevState.map((variable) =>
        variable.id === variableId ? { ...variable, name: value } : variable,
      ),
    )
  }

  function handleChangeEnvironment({
    environmentId,
    value,
  }: {
    environmentId: string
    value: string
  }) {
    setEnvironments((prevState) =>
      prevState.map((environment) =>
        environment.id === environmentId
          ? { ...environment, name: value }
          : environment,
      ),
    )
  }

  function handleChangeValue({
    environmentId,
    variableId,
    value,
  }: {
    environmentId: string
    variableId: string
    value: string
  }) {
    setValues((prevState) => ({
      ...prevState,
      [`${environmentId}-${variableId}`]: value,
    }))
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-[52px] items-center px-4">
        <p className="text-base font-medium">Environments</p>
      </header>

      <table className="m-4">
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
                  placeholder="Environment name"
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
                    value={values[`${environment.id}-${variable.id}`] ?? ''}
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
