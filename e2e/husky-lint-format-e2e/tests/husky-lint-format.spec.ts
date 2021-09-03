import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('husky-lint-format e2e', () => {
  it('should create husky-lint-format', async () => {
    const plugin = uniq('husky-lint-format');
    ensureNxProject(
      '@nx-extras/husky-lint-format',
      'dist/packages/husky-lint-format'
    );
    await runNxCommandAsync(
      `generate @nx-extras/husky-lint-format:husky-lint-format ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('husky-lint-format');
      ensureNxProject(
        '@nx-extras/husky-lint-format',
        'dist/packages/husky-lint-format'
      );
      await runNxCommandAsync(
        `generate @nx-extras/husky-lint-format:husky-lint-format ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('husky-lint-format');
      ensureNxProject(
        '@nx-extras/husky-lint-format',
        'dist/packages/husky-lint-format'
      );
      await runNxCommandAsync(
        `generate @nx-extras/husky-lint-format:husky-lint-format ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
