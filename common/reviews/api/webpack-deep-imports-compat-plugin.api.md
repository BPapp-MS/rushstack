## API Report File for "@rushstack/webpack-deep-imports-compat-plugin"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { Compiler } from 'webpack';
import type { Configuration } from 'webpack';
import type { WebpackPluginInstance } from 'webpack';

// @public
export class DeepImportsCompatPlugin implements WebpackPluginInstance {
    // (undocumented)
    apply(compiler: Compiler): void;
    // (undocumented)
    static applyToWebpackConfiguration(webpackConfiguration: Configuration, options: IDeepImportsCompatPluginOptions): void;
}

// @public (undocumented)
export interface IDeepImportsCompatPluginOptions {
    bundleName: string;
    context?: string;
    inFolder: {
        folderName: string;
        includePatterns: string[];
        excludePatterns?: string[];
    };
    outFolderName: string;
}

// (No @packageDocumentation comment for this package)

```