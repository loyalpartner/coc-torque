import {
  ExtensionContext, LanguageClient,
  LanguageClientOptions, ServerOptions, workspace
} from 'coc.nvim'

let client: LanguageClient

export async function activate(context: ExtensionContext): Promise<void> {

  const serverOptions: ServerOptions = {
    command: 'torque-language-server',
    options: {
      cwd: workspace.rootPath
    },
    // args: [ "-l" , "/tmp/test"]
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{language: 'torque', pattern: '**/*.tq'}],
    // initializationFailedHandler: () => false,
  }

  client = new LanguageClient(
    'torque',
    'torque-language-server',
    serverOptions, clientOptions
  )


  client.onDidChangeState(e => {})
  client.start()

  await client.onReady()
  workspace.findFiles("**/*.tq").then(urls => {
    client.sendNotification('torque/fileList', {
      files: urls.map(t => t.toString())
    })
  })

  // context.subscriptions.push(services.registLanguageClient(client))
}

export function deactivate() {
  if (!client) {return undefined;}
  return client.stop();
}
