import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';
import {
	AUTH_SECRET,
	AUTH_AUTH0_ID,
	AUTH_AUTH0_SECRET,
	AUTH_AUTH0_ISSUER
} from '$env/static/private';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const auth0Issuer = AUTH_AUTH0_ISSUER.replace(/\/$/, '');

const vercelTrustedOrigins = [
	env.VERCEL_URL,
	env.VERCEL_BRANCH_URL,
	env.VERCEL_PROJECT_PRODUCTION_URL
]
	.filter((u): u is string => Boolean(u))
	.map((u) => `https://${u}`);

type Auth0Claims = { storeId: string; priceManager: boolean };

const pendingAuth0Claims = new Map<string, Auth0Claims>();

function claimsFromAuth0Profile(profile: Record<string, unknown>): Auth0Claims {
	const metadata = profile.app_metadata as Record<string, unknown> | undefined;
	return {
		storeId: (metadata?.storeId as string) ?? '',
		priceManager: (metadata?.priceManager as boolean) ?? false
	};
}

async function applyAuth0Claims(user: { email?: string | null }) {
	const email = user.email?.toLowerCase();
	if (!email) return;
	const claims = pendingAuth0Claims.get(email);
	if (!claims) return;
	pendingAuth0Claims.delete(email);
	return { data: claims };
}

export const auth = betterAuth({
	secret: AUTH_SECRET,
	logger: dev ? { level: 'debug' } : undefined,
	trustedOrigins: vercelTrustedOrigins,
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'auth0',
					clientId: AUTH_AUTH0_ID,
					clientSecret: AUTH_AUTH0_SECRET,
					accountIssuer: `${auth0Issuer}/`,
					discoveryUrl: `${auth0Issuer}/.well-known/openid-configuration`,
					authorizationUrl: `${auth0Issuer}/authorize`,
					tokenUrl: `${auth0Issuer}/oauth/token`,
					userInfoUrl: `${auth0Issuer}/userinfo`,
					accountSubject: ({ profile }) => String(profile.sub ?? ''),
					scopes: ['openid', 'profile', 'email'],
					overrideUserInfo: true,
					getUserInfo: async (tokens) => {
						if (!tokens.accessToken) return null;
						const response = await fetch(`${auth0Issuer}/userinfo`, {
							headers: { Authorization: `Bearer ${tokens.accessToken}` }
						});
						if (!response.ok) return null;
						const profile = (await response.json()) as Record<string, unknown>;
						if (typeof profile.email === 'string') {
							pendingAuth0Claims.set(profile.email.toLowerCase(), claimsFromAuth0Profile(profile));
						}
						return {
							...profile,
							id: String(profile.sub ?? ''),
							email: profile.email as string,
							emailVerified: Boolean(profile.email_verified),
							name: (profile.name as string) ?? '',
							image: profile.picture as string | undefined
						};
					}
				}
			]
		})
	],
	user: {
		additionalFields: {
			storeId: {
				type: 'string',
				required: false,
				defaultValue: '',
				input: false,
				returned: true
			},
			priceManager: {
				type: 'boolean',
				required: false,
				defaultValue: false,
				input: false,
				returned: true
			}
		}
	},
	databaseHooks: {
		user: {
			create: { before: applyAuth0Claims },
			update: { before: applyAuth0Claims }
		}
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 7 * 24 * 60 * 60,
			strategy: 'jwe'
		}
	},
	account: {
		storeStateStrategy: 'cookie',
		storeAccountCookie: true
	}
});

export type BetterAuthSession = typeof auth.$Infer.Session;
