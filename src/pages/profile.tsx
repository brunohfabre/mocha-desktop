export function Profile() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col py-8 px-4 gap-8">
      <div className="flex flex-col gap-2">
        <strong className="text-lg font-medium">Account details</strong>

        <div className="border rounded-lg p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nam
            quos. Labore, architecto ab cumque ullam soluta incidunt corporis
            veritatis nobis saepe doloremque neque fugiat tempora dolorum
            pariatur minima aliquid.
          </p>
        </div>
      </div>

      {/* <div className="flex flex-col gap-2">
        <strong className="text-lg font-medium">Danger zone</strong>

        <div className="border rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-base font-semibold">Delete account</p>
              <p className="text-sm text-gray-500">
                This action will be remove all content vinculated your account
                like collections.
              </p>
            </div>
            <Button variant="destructive">Delete account</Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
