import { TestBed } from '@angular/core/testing'

type CompilerOptions = Partial<{
  providers: unknown[];
  useJit: boolean;
  preserveWhitespaces: boolean;
}>;
export type ConfigureFn = (testBed: typeof TestBed) => void;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const configureTests = (configure: ConfigureFn, compilerOptions: CompilerOptions = {}) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions
  }

  const configuredTestBed = TestBed.configureCompiler(compilerConfig)

  configure(configuredTestBed)

  return configuredTestBed.compileComponents().then(() => configuredTestBed)
}
