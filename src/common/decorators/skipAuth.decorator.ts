import { SetMetadata } from "@nestjs/common";

export const SHOULD_SKIP_AUTH_KEY =
	"Fko1HnjMAFn1O3PkrjbAOEQrdyr5KK4JOW4x92hbdBgrg6sHdlJ51Yyg/erLRpVt4XCeTKK3edkLbzPBNiWMEcwR+/CqDRjBpWptb/giYbuTyxV6NycmCAeDkWI/Tx9AIVlPRMawqAh6AWzGMUotVoVjY/vzX6JKUx6dqlT9h4Ahs99268NR0DNDBsuvaJXnNnfzQTBZjF+hjvfktxP0vdFERWbnB8Z582t1NJrYVuZAlUhygSN3gLNTMwXtxWmzly7wATavzydP8PJOEIIufALA6aWJ0Cd//aMQPmP4fuApIaE4DRJKu6M/hX9k8v0X45nNFqAfjONR8eV1QiioWA==";
export const SkipAuth = () => SetMetadata(SHOULD_SKIP_AUTH_KEY, true);
