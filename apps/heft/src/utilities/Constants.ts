// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

/** @beta */
export class Constants {
  public static projectHeftFolderName: string = '.heft';

  public static projectConfigFolderName: string = 'config';

  public static buildCacheFolderName: string = 'build-cache';

  public static pluginParameterLongName: string = '--plugin';

  public static debugParameterLongName: string = '--debug';

  public static maxParallelism: number = 100;

  public static baseActions: { build: 'build'; clean: 'clean'; start: 'start'; test: 'test' } = {
    build: 'build',
    clean: 'clean',
    start: 'start',
    test: 'test'
  } as const;
}
