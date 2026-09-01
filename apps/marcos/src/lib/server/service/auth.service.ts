import {
	AWS_ACCESS_KEY_ID,
	AWS_REGION,
	AWS_SECRET_ACCESS_KEY,
	CALCULATED_ITEM_ORDER_TABLE,
	CONFIG_TABLE,
	CUSTOMER_TABLE,
	FILE_TABLE,
	FILES_BUCKET,
	LIST_PRICING_TABLE,
	MAIN_STORE_ID,
	MOLD_PRICES_BUCKET,
	ORDER_AUDIT_TRAIL_TABLE,
	ORDER_TABLE,
	ORDER_SET_TABLE,
	REPORTS_BUCKET,
	TRACK_AWS_ACCESS_KEY_ID,
	TRACK_AWS_SECRET_ACCESS_KEY
} from '$env/static/private';
import type { BetterAuthSession } from '../../../auth';
import {
	PUBLIC_REPOSITORY,
	type ICoreConfiguration,
	type ICorePublicConfiguration
} from '@marcsimolduressonsardina/core/config';
import type { AppUser } from '@marcsimolduressonsardina/core/type';
import { redirect } from '@sveltejs/kit';
export class AuthService {
	public static generateConfiguration(user: AppUser): ICoreConfiguration {
		return {
			runInAWSLambda: false,
			user,
			region: AWS_REGION,
			calculatedItemTable: CALCULATED_ITEM_ORDER_TABLE,
			configTable: CONFIG_TABLE,
			customerTable: CUSTOMER_TABLE,
			storeId: user.storeId,
			filesBucket: FILES_BUCKET,
			moldPricesBucket: MOLD_PRICES_BUCKET,
			fileTable: FILE_TABLE,
			orderSetTable: ORDER_SET_TABLE,
			listPricingTable: LIST_PRICING_TABLE,
			orderAuditTrailTable: ORDER_AUDIT_TRAIL_TABLE,
			reportsBucket: REPORTS_BUCKET,
			orderTable: ORDER_TABLE,
			credentials: {
				accessKeyId: AWS_ACCESS_KEY_ID,
				secretAccessKey: AWS_SECRET_ACCESS_KEY
			}
		};
	}

	public static generatePublicConfiguration(): ICorePublicConfiguration {
		return {
			runInAWSLambda: false,
			user: {
				id: 'public',
				name: 'public',
				storeId: PUBLIC_REPOSITORY,
				priceManager: false
			},
			region: AWS_REGION,
			calculatedItemTable: CALCULATED_ITEM_ORDER_TABLE,
			customerTable: CUSTOMER_TABLE,
			storeId: PUBLIC_REPOSITORY,
			listPricingTable: PUBLIC_REPOSITORY,
			orderTable: ORDER_TABLE,
			credentials: {
				accessKeyId: TRACK_AWS_ACCESS_KEY_ID,
				secretAccessKey: TRACK_AWS_SECRET_ACCESS_KEY
			}
		};
	}

	public static generateUserFromAuth(session?: BetterAuthSession | null): AppUser | undefined {
		const user = session?.user;
		if (user?.email == null || !user.storeId) {
			return undefined;
		}

		return {
			id: user.email,
			name: user.name,
			storeId: user.storeId,
			priceManager: user.priceManager ?? false
		};
	}

	public static checkAuth(locals: App.Locals): void {
		const appUser = locals.user;
		if (!appUser) redirect(303, '/auth/signin');
	}

	public static isAdmin(user?: AppUser): boolean {
		return user?.priceManager ?? false;
	}

	public static isMainStore(user?: AppUser): boolean {
		return user?.storeId === MAIN_STORE_ID;
	}
}
