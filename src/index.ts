import {
  ExtensionContext, LanguageClient,
  LanguageClientOptions, workspace
} from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {

  const serverOptions = {
    command: "torque-language-server",
    args: ["-l", "/tmp/test"]
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{scheme: 'file', language: 'torque'}],
    initializationFailedHandler: () => false,
  }

  const client = new LanguageClient(
    'torque',
    serverOptions, clientOptions
  )


  client.onDidChangeState(e => {})

  client.start()

  // await workspace.loadFiles("**/*.tq")

  await client.onReady()

  workspace.findFiles("**/*.tq").then(urls => {
    client.sendNotification('torque/fileList', {
      files: urls.map(t=>t.toString())
    })
  })

  // context.subscriptions.push(services.registLanguageClient(client))
}
