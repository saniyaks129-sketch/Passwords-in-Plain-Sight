# Concurrency & Rate Limiting Technical Report

## 1. Root Cause: Why Check-Then-Insert Fails Under Concurrent Load
The check-then-insert pattern relies on two sequential database operations: querying existing records (`findFirst`) and inserting a new record (`create`). Under heavy concurrent load, multiple requests execute the check step simultaneously. Because neither request has created a record yet, both checks succeed. Milliseconds later, both requests execute `create()`, resulting in duplicate bookings for the same seat. This gap between reading and writing is a classic race condition that application-level code cannot bridge.

## 2. Why Database Unique Constraint Solves the Race Condition
A composite unique constraint (`@@unique([seatId, showId])`) operates at the database schema level. Relational databases enforce constraints atomically during write transactions. When two concurrent write requests attempt to insert identical `(seatId, showId)` pairs, the database locks the index and allows only the first operation to succeed. The second operation immediately violates the unique constraint and is rejected at the storage layer, making double-booking physically impossible.

## 3. Why Rate Limiting Alone Is Not Sufficient
Rate limiting restricts the volume of inbound requests per client/IP within a time window (e.g., 10 requests per minute). While this prevents flood attacks and server overloads, it does not prevent race conditions. Two separate, legitimate users submitting booking requests within the same millisecond will both bypass the rate limiter. Without a database unique constraint, both valid requests would still result in double-booking.

## 4. Understanding Prisma Error P2002 and Returning HTTP 409
When a database unique constraint is violated, Prisma throws a `PrismaClientKnownRequestError` with error code `P2002` (Unique constraint failed). Leaving this unhandled causes the application to crash with a `500 Internal Server Error`. Catching `P2002` explicitly and returning a `409 Conflict` HTTP status code correctly informs the client that the request was valid but rejected because the resource (seat) is already claimed.