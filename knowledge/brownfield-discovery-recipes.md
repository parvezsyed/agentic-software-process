---
type: Playbook
title: Brownfield Discovery Recipes
description: Concrete commands for mapping affected areas, dependents, and blast radius.
tags: [brownfield, discovery, blast-radius]
timestamp: 2026-06-14T00:00:00Z
---

# Goal

Before editing brownfield code, identify consumers, tests, ownership, and likely blast radius with executable checks.

# Core Commands

```sh
git status --short
git ls-files
rg -n "symbol_or_route_or_table_name"
rg -n "import .*module_name|from .*module_name"
rg -n "endpoint|event_name|table_name|feature_flag"
find . -maxdepth 3 -iname '*test*' -o -iname '*spec*'
```

# JavaScript Or TypeScript

```sh
npm test -- --help
npm run test -- --runInBand
npm run typecheck
npm ls package-name
rg -n "from ['\"]([^'\"]+)['\"]|require\("
```

# Python

```sh
pytest --collect-only
pytest path/to/relevant_tests.py
python -m pip show package-name
rg -n "from module|import module|@app\\.route|APIRouter|urlpatterns"
rg -n "class .*Model|ForeignKey|relationship\\(|Table\\("
python -m pip freeze
```

# Go

```sh
go test ./...
go list ./...
go list -deps ./...
go mod why module/name
rg -n "func .*\\(|type .* struct|interface \\{|http\\.Handle|grpc|protobuf"
```

# Java Or Kotlin

```sh
./gradlew test
./gradlew dependencies
mvn test
mvn dependency:tree
rg -n "@RequestMapping|@GetMapping|@PostMapping|interface .*Repository|@Entity|@Service"
```

# Rust

```sh
cargo test
cargo tree
cargo metadata --no-deps
rg -n "pub fn|pub struct|trait |mod |use crate::"
```

# Ruby

```sh
bundle exec rspec
bundle exec rails routes
bundle exec bundle viz
rg -n "class .* < ApplicationRecord|has_many|belongs_to|scope |def "
```

# API Or Contract Changes

```sh
rg -n "route_name|operationId|protobuf_message|graphql_type|openapi"
rg -n "client\.|fetch\(|axios\.|grpc|GraphQL"
```

# Database Or Migration Changes

```sh
rg -n "CREATE TABLE|ALTER TABLE|DROP TABLE|migration|schema.rb|alembic|liquibase|flyway"
rg -n "table_name|column_name|foreign key|index"
```

# Monorepos

```sh
rg -n "package.json|go.mod|pyproject.toml|pom.xml|build.gradle|Cargo.toml"
rg -n "CODEOWNERS|OWNERS|catalog-info.yaml|service.yaml"
```

# Output

Record:
- Known consumers.
- Unknown or inferred consumers.
- Tests that cover the change.
- Tests that should exist but do not.
- Rollback path.
- Files or modules that must remain out of scope.
