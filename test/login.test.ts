import { expect, test } from 'vitest';
import { login } from '../src/api/auth';

test("should return Email/Password is empty", async () => {
  const { resp, err } = await login("", "");
  expect(resp).toBe(null);
  expect(err?.message).toBe("Email/Password is empty");
});

test("should return AuthenticationError", async () => {
  const { resp, err } = await login("test@test.com", "test");
  expect(resp).toBe(null);
  expect(err?.message).toBe("Email/Password is incorrect");
});

test("should return success", async () => {
  const { resp, err } = await login("hello@world.com", "password");
  expect(resp).toContain("eyJra");
  expect(err).toBe(null);
});