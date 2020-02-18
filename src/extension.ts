import * as vscode from 'vscode';

import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {

  console.log('bettersql extension is now activated');
  
  const disposable = vscode.languages.registerDocumentFormattingEditProvider('sql', {
    async provideDocumentFormattingEdits(document: vscode.TextDocument) {
      const response = await axios.post('http://ahsmart.com:5456/format', { sql: document.getText()});
      const formatted = response.data.sql;
      return [vscode.TextEdit.replace(fullDocumentRange(document), formatted)];
    }
  });
}

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
  const lastLineId = document.lineCount - 1;
  return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('bettersql extension deactivated');
}
