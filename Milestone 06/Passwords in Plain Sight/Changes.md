# Security Fixes: Passwords in Plain Sight

## What I Found
User credentials were saved without hashing. In the database record for `test@example.com`, the password field contained plain text: `"password": "password123"`. This falls into **Type 1 — Plain Text Storage**.

## Root Cause
The signup route directly passed `req.body.password` into `User.create()` without applying a cryptographic hash function. The login controller compared passwords using direct string equality (`user.password === req.body.password`).

## Why This Is Dangerous
Plain-text storage allows anyone with database access to view credentials. Since users reuse passwords across services, a breach enables automated credential stuffing attacks across personal, banking, and work accounts.

## What I Fixed
Installed `bcryptjs` to hash passwords prior to storage and securely compare hashes during login.

### Signup Fix:
```javascript
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const user = await User.create({ email, password: hashedPassword });