#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

npm i @nestjs/typeorm typeorm better-sqlite3 class-validator class-transformer @nestjs/mapped-types @nestjs/config @nestjs/passport passport passport-local passport-jwt @nestjs/jwt bcrypt

npm i -D @types/better-sqlite3 @types/passport-local @types/passport-jwt @types/bcrypt


