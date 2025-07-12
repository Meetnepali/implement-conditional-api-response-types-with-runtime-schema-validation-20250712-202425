#!/bin/bash
set -e

./install.sh

npx ts-node src/index.ts
