#!/bin/bash

# Exit if no task description is provided
if [ -z "$1" ]; then
  echo "Error: Provide a task description."
  echo "Usage: ./claude_task.sh 'Your task here' [optional_target_file]"
  exit 1
fi

TASK="$1"
CONTEXT_FILE="$2"

if [ -n "$CONTEXT_FILE" ] && [ -f "$CONTEXT_FILE" ]; then
  echo "Injecting $CONTEXT_FILE into a fresh Claude session..."
  cat "$CONTEXT_FILE" | claude -p "$TASK. Adhere strictly to the rules in CLAUDE.md."
else
  echo "Starting fresh Claude session..."
  claude -p "$TASK. Adhere strictly to the rules in CLAUDE.md."
fi
