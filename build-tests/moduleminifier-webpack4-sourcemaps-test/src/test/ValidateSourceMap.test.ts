// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
import { PackageJsonLookup, FileSystem, JsonFile } from '@rushstack/node-core-library';
import * as path from 'path';

declare const __dirname: string;

describe('ValidateSourceMap', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('includes the sourcefile in the sourcemaps', () => {
    validateSourceMap('src/index.ts', 'dist-dev');
    validateSourceMap('src/submodule.ts', 'dist-dev');
    validateSourceMap('src/index.ts', 'dist-prod');
    validateSourceMap('src/submodule.ts', 'dist-prod');
  });
});

function validateSourceMap(sourceFileName: string, outFolder: string) {
  const packageJsonLookup: PackageJsonLookup = new PackageJsonLookup();
  const packageFolder: string | undefined = packageJsonLookup.tryGetPackageFolderFor(__dirname);
  if (!packageFolder) {
    throw new Error('Unable to find package folder');
  }

  const outDirPath: string = path.join(packageFolder, outFolder);
  const distFiles: string[] = FileSystem.readFolderItemNames(outDirPath);

  const sourceMapName = distFiles.find((element) => element.endsWith('.js.map'));
  if (!sourceMapName) {
    console.error('files in outDir are' + distFiles.toString());
    throw new Error('Unable to find source map');
  }

  const sourceMapObject = JsonFile.load(path.join(outDirPath, sourceMapName!));
  if (!sourceMapObject?.sources) {
    throw new Error('Unable to find sources in source map');
  }
  const sourceFilePath = '../' + sourceFileName;
  const webpackFilePath = 'webpack:///./' + sourceFileName;
  expect(sourceMapObject.sources).toContain(webpackFilePath);

  const actualSourceContent = FileSystem.readFile(path.join(outDirPath, sourceFilePath));
  const sourceContent = sourceMapObject.sourcesContent[sourceMapObject.sources.indexOf(webpackFilePath)];
  expect(sourceContent).toEqual(actualSourceContent);
}
