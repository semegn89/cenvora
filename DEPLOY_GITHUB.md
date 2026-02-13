# Заливка на GitHub

Репозиторий уже инициализирован, первый коммит сделан.

## 1. Создай новый репозиторий на GitHub

1. Открой https://github.com/new  
2. **Repository name:** `cenvora` (или любое имя)  
3. **Public**, без README / .gitignore (у нас уже есть)  
4. Нажми **Create repository**

## 2. Привяжи remote и запушь

Подставь вместо `ТВОЙ_USERNAME` свой логин GitHub:

```bash
cd /Users/grigorijs/cenvora
git remote add origin https://github.com/ТВОЙ_USERNAME/cenvora.git
git branch -M main
git push -u origin main
```

Если используешь SSH:

```bash
git remote add origin git@github.com:ТВОЙ_USERNAME/cenvora.git
git push -u origin main
```

## Если GitHub CLI уже залогинен

```bash
gh auth login
gh repo create cenvora --source=. --public --push
```
