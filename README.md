# @chatkit-lab/release-practice

这是一个用于练习 npm 发布流程的独立小包，不依赖 `chatkit-ui`，也不会影响现有项目。包内只提供一个简单函数，重点是练习：

- `package.json` 发布配置
- Changesets 创建发布意图
- GitHub Actions 创建 Version PR
- 合并 Version PR 后自动发布 npm
- 发布后验证 registry 元数据

## 本地验证

```bash
npm install
npm test
npm pack --dry-run
```

`npm pack --dry-run` 会列出将进入 tarball 的文件。这个包没有构建步骤，主要发布：

```text
package.json
README.md
LICENSE
index.js
index.cjs
index.d.ts
```

## 练习发布

1. 在 GitHub 创建一个新仓库，例如 `release-practice`。
2. 在仓库 Secret 中配置：

```text
NPM_TOKEN
```

3. 关联远端并推送 `main`：

```bash
git remote add origin git@github.com:<your-name>/release-practice.git
git push -u origin main
```

4. 等待 Release workflow 运行。由于仓库里已有 `.changeset/initial-release.md`，Changesets 会创建 Version PR。
5. 检查 Version PR：
   - `package.json` 的版本应变为 `0.1.0`
   - 应新增 `CHANGELOG.md`
   - `.changeset/initial-release.md` 应被删除
6. 合并 Version PR。
7. Release workflow 再次触发并执行 `npm run release`。
8. 发布完成后验证：

```bash
npm view @chatkit-lab/release-practice version
npm view @chatkit-lab/release-practice
```

## 练习第二次发布

创建功能分支：

```bash
git checkout main
git pull
git checkout -b feat/update-message
```

修改 `index.js`、`index.cjs` 和测试。然后验证并创建 changeset：

```bash
npm test
npm run changeset
```

选择 `patch`，填写变更说明，提交并创建 PR。合并功能 PR 后，再合并 Changesets 生成的 Version PR，即可发布 `0.1.1`。

## 注意

npm 发布后的版本不可覆盖。这个练习包会真实出现在 `chatkit-lab` 组织下，建议使用一个后续可以保留的包名。
