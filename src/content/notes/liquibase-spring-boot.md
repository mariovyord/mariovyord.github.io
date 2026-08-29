---
title: "Liquibase with Spring Boot"
description: "What Liquibase is, how it fits into a Spring Boot app, and the practices that keep database migrations painless."
pubDate: "August 2 2026"
tags: ["spring", "java", "database"]
status: "growing"
---

Database schema changes are the part of software development that teams most often get wrong. Code is versioned, reviewed, and deployed carefully — but the database is often an afterthought, mutated by hand in a production console.

Liquibase fixes that by treating your schema the way you already treat your code: versioned, reviewable, and applied consistently everywhere.

## What Liquibase Is

Liquibase is an open-source, database-agnostic tool for tracking, managing, and applying database schema changes.

Instead of writing raw SQL for every environment, you describe your changes in **changesets** inside a **changelog**. Liquibase then orders those changesets, applies the ones that haven't run yet, and records what it did in its own tracking tables.

Three ideas make it work:

- **Changelog** — a file (or a tree of files) describing every change to your schema. Changesets in a changelog are applied in order.
- **Changeset** — one atomic change: create a table, add a column, insert reference data. Each has a unique `id` + `author` + filename combination.
- **Tracking tables** — `DATABASECHANGELOG` (what ran, and its checksum) and `DATABASECHANGELOGLOCK` (prevents two processes from migrating at the same time).

A changeset is applied only once. On the next run, Liquibase looks at its tracking tables, skips everything that already ran, and applies only the new ones. Once deployed, a changeset should be treated as immutable — if you edit it, its checksum changes and Liquibase will refuse to run it.

## Why Use It in a Spring Boot App

Spring Boot gives you a lot for free, but schema management still needs a strategy. Liquibase integrates directly with Spring Boot's auto-configuration, so the whole thing becomes nearly zero-config:

- Migrations run **on application startup**, before your app starts accepting requests.
- It uses your existing `spring.datasource` connection — no separate wiring needed.
- Changelogs live on the classpath, versioned in the same git repo as your code.
- Environments converge: local, CI, staging, and production all get exactly the same schema, in the same order.

Add the dependency and a changelog, and you're done:

```xml
<dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-core</artifactId>
</dependency>
```

```properties
spring.liquibase.change-log=classpath:db/changelog/db.changelog-master.yaml
```

That's the whole setup. Spring Boot detects `liquibase-core` on the classpath, reads `spring.liquibase.change-log` (it has a sensible default if you omit it), and runs pending changesets at startup.

## How It Runs at Startup

When your app boots, Liquibase:

1. Connects to the datasource.
2. Acquires the **changelog lock** so no two instances migrate concurrently.
3. Creates the `DATABASECHANGELOG` and `DATABASECHANGELOGLOCK` tables if missing.
4. Compares the changelog against what's recorded and runs the missing changesets, each in a transaction.
5. Releases the lock and lets the application continue.

Because of the lock, you can safely run multiple app instances against the same database — only one will ever migrate at a time.

## Changelog Structure

Keep a master changelog that includes your real changelogs in order:

```yaml
databaseChangeLog:
  - include:
      file: db/changelog/changes/0001-schema.sql
  - include:
      file: db/changelog/changes/0002-users.yaml
  - include:
      file: db/changelog/changes/0003-indexes.yaml
```

A simple YAML changeset:

```yaml
databaseChangeLog:
  - changeSet:
      id: 2
      author: mario
      changes:
        - createTable:
            tableName: users
            columns:
              - column:
                  name: id
                  type: bigint
                  autoIncrement: true
                  constraints:
                    primaryKey: true
                    nullable: false
              - column:
                  name: email
                  type: varchar(255)
                  constraints:
                    nullable: false
                    unique: true
```

Or SQL, using Liquibase's formatted-sql syntax:

```sql
--liquibase formatted sql
--changeset mario:1
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    total NUMERIC(10,2) NOT NULL
);
```

You can mix formats — some changesets in SQL, some in YAML. Pick what's clearest for the change, not one format for everything.

## Best Practices

### One logical change per changeset

Each changeset should do one thing — create one table, add one column. This gives you:

- A clean, reviewable history ("what did this PR do to the DB?").
- The ability to roll back precisely.
- Clear failure points. If a changeset fails halfway, you know exactly which change broke.

Liquibase runs each changeset in a transaction, so a failed changeset is rolled back as a unit — but only if the database supports transactions for that change. Keep them small.

### Never edit a changeset after it's merged

Once a changeset has run anywhere, it's history. Its checksum is recorded in `DATABASECHANGELOG`. Editing it produces a checksum mismatch and Liquibase fails with an error — by design.

If you need a different outcome, add a *new* changeset. This is the rule that makes the tool useful: your change history is append-only, exactly like git history.

### Include rollback logic for risky changes

Liquibase can auto-generate rollbacks for some changes, but for anything destructive (dropping columns, changing types, deleting data), write the rollback explicitly:

```yaml
databaseChangeLog:
  - changeSet:
      id: 4
      author: mario
      changes:
        - dropColumn:
            tableName: users
            columnName: legacy_field
      rollback:
        - addColumn:
            tableName: users
            columns:
              - column:
                  name: legacy_field
                  type: varchar(255)
```

Writing rollbacks turns a one-way door into a round trip — it lets you test down migrations in CI and recover from bad releases.

### Use contexts and profiles for environment differences

Most schema changes should run everywhere, but some are environment-specific: seed data for dev, not prod.

```properties
# application-dev.properties
spring.liquibase.contexts=dev

# application-prod.properties
spring.liquibase.contexts=prod
```

```yaml
- changeSet:
    id: 5
    author: mario
    context: dev
    changes:
      - insert:
          tableName: users
          columns:
            - column:
                name: email
                value: demo@example.com
```

Keep this minimal — a schema that diverges per environment will drift, and drift defeats the whole point.

### Control when migrations run

Spring Boot runs migrations on startup by default. If you prefer to run them as a separate, explicit step in your deployment pipeline, you can disable startup runs and use the Maven/Gradle plugin or the CLI instead:

```properties
spring.liquibase.enabled=false
```

A common pattern: run migrations as an explicit pre-deploy step (via the Maven `liquibase:update` goal) so that new code never sees a schema it doesn't understand. This matters for zero-downtime deploys where old and new versions run side by side.

### Make production changes additive-first

Prefer changes that don't break the running app:

- Add a column, don't rename it, until the new code is out and the old one is gone.
- Make new columns nullable (or with a default) when adding to a hot table.
- Do data backfills in their own changeset, in small batches.

This lets you deploy database changes before the code that uses them — a requirement for smooth rolling deploys.

### Test against a real database

Schema changes are where "works on my machine" bites hardest. Make sure your CI runs migrations against a real database (or a disposable container like Testcontainers), not just H2. Dialect differences between H2 and Postgres/MySQL silently break SQL changesets.

Liquibase also supports **rollback testing**: generate the SQL to roll back a release and apply it to a throwaway database to prove it works before you ever need it in production.

## Common Pitfalls

- **Editable changesets** — editing a merged changeset causes a checksum error. Add a new one instead.
- **Ignoring the changelog lock** — a stuck `DATABASECHANGELOGLOCK` row happens when a migration is killed mid-run. If it occurs, verify nothing is actually migrating, then clear the lock — but never clear it while a deploy is in flight.
- **Big, monolithic changesets** — they fail as one unit and are painful to roll back. Split them up.
- **Relying on H2 for everything** — H2 is a fine test stand-in but has real differences from production databases.
- **Letting dev and prod diverge** — if schemas are built by hand in prod "just this once," drift starts. The changelog should be the only source of truth.

## Summary

Liquibase brings the practices you already use for code — versioning, review, ordered deployment — to your database schema. With Spring Boot it's nearly effortless to adopt: one dependency, one changelog, and migrations that run automatically on startup.

The habits that keep it painless are the same habits that keep code painless: small changes, an append-only history, explicit rollbacks, and testing against a real database.

## Further Reading
- https://docs.liquibase.com/
- https://docs.spring.io/spring-boot/reference/how-to/data-initialization.html
- https://www.liquibase.com/
