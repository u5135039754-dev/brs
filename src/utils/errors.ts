import axios from 'axios';

type ErrorKey = number | 'network';
type StatusMessageMap = Partial<Record<ErrorKey, string>>;

const DEFAULT_MESSAGES: StatusMessageMap = {
  401: 'You need to sign in to continue.',
  403: "You don't have permission to do that.",
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Something went wrong on our end. Please try again later.',
  network: "Can't reach the server. Check your connection and try again.",
};

const DEFAULT_FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Turns any thrown error into copy safe to show a user.
 *
 * `overrides` lets a call site swap in context-specific wording for
 * particular status codes (e.g. a login form wants its own 401 message)
 * or for a dropped connection (key `'network'`), without losing the shared
 * defaults for everything else.
 */
export function getErrorMessage(
  err: unknown,
  overrides: StatusMessageMap = {},
  fallback: string = DEFAULT_FALLBACK_MESSAGE,
): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return overrides.network ?? DEFAULT_MESSAGES.network ?? fallback;
    }

    const status = err.response.status;
    return overrides[status] ?? DEFAULT_MESSAGES[status] ?? fallback;
  }

  if (err instanceof Error && err.message) {
    return err.message;
  }

  return fallback;
}
