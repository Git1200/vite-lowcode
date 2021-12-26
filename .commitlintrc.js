// build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
// update：更新某功能（不是 feat, 不是 fix）
// docs：文档更新
// feat：新增功能
// fix：bug 修复
// perf：性能优化
// refactor：重构代码(既没有新增功能，也没有修复 bug)
// style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
// test：新增测试用例或是更新现有测试
// revert：回滚某个更早之前的提交
// chore：构建过程或辅助工具的变动
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'build', 'update', 'docs', 'feat', 'fix', 'perf', 'refactor', 'style', 'test', 'revert', 'chore' 
     ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};