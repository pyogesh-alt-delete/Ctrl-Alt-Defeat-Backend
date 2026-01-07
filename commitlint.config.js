module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',      // New feature
                'fix',       // Bug fix
                'docs',      // Documentation
                'style',     // Code style changes (no logic)
                'refactor',  // Code refactoring
                'perf',      // Performance improvement
                'test',      // Adding/updating tests
                'chore',     // Build process, dependencies
                'ci',        // CI/CD configuration
            ],
        ],
        'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
        'subject-full-stop': [2, 'never', '.'],
        'subject-empty': [2, 'never'],
        'type-case': [2, 'always', 'always-lowercase'],
        'type-empty': [2, 'never'],
    },
};