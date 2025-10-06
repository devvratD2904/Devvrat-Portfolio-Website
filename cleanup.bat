@echo off
echo Removing TypeScript files and old config...

del /s /q *.ts
del /s /q *.tsx
del /s /q tsconfig*.json
del /s /q vite.config.ts

echo Done! Now run:
echo 1. npm install
echo 2. npm run dev
