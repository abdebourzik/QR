// Fixed src/components/context/Admin.tsx

import { createContext, ReactNode, useEffect, useState } from 'react';

import noop from 'lodash/noop';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { TMenu } from '#utils/database/models/menu';
import { TOrder } from '#utils/database/models/order';
import { TProfile } from '#utils/database/models/profile';
import { TTable } from '#utils/database/models/table';
import { fetcher } from '#utils/helper/common';

const AdminDefault: TAdminInitialType = {
	profile: undefined,
	menus: [],
	tables: [],
	profileLoading: false,
	profileMutate: () => new Promise(noop),
	orderRequest: [],
	orderActive: [],
	orderHistory: [],
	orderAction: () => new Promise(noop),
	orderActionLoading: false,
	orderLoading: false,
};

const sortByDate = (a: any, b: any) => new Date(b.updatedAt as string).getTime() - new Date(a.updatedAt as string).getTime();

export const AdminContext = createContext(AdminDefault);
export const AdminProvider = ({ children }: TAdminProviderProps) => {
	const params = useSearchParams();
	const tab = params.get('tab');
	const subTab = params.get('subTab');
	
	// Fetch profile data
	const { data: profileData, isLoading: profileLoading, mutate: profileMutate } = useSWR('/api/admin', fetcher);
	const { profile, menus = [], tables = [] } = profileData || {};
	
	// Fetch orders data with more frequent refresh for active orders
	const { data: orderData = [], isLoading: orderLoading, mutate } = useSWR(
		'/api/admin/order', 
		fetcher, 
		{ 
			refreshInterval: 3000, // Refresh every 3 seconds
			revalidateOnFocus: true,
			dedupingInterval: 1000 // Prevent duplicate requests within 1 second
		}
	);
	
	const [orderActionLoading, setOrderActionLoading] = useState(false);

	// Process orders into categories
	const { orderRequest, orderActive, orderHistory } = orderData?.reduce?.(
		(acc: { orderRequest: TOrder[], orderActive: TOrder[], orderHistory: TOrder[] }, order: TOrder) => {
			if (!order || !order._id) return acc; // Skip invalid orders
			
			if (order.state === 'active') {
				const hasApproved = order.products?.some(({ adminApproved }) => adminApproved);
				const hasUnapproved = order.products?.some(({ adminApproved }) => !adminApproved);
				
				if (hasApproved) acc.orderActive.push(order);
				if (hasUnapproved) acc.orderRequest.push(order);
			} else {
				acc.orderHistory.push(order);
			}
			return acc;
		},
		{ orderRequest: [], orderActive: [], orderHistory: [] },
	) ?? { orderRequest: [], orderActive: [], orderHistory: [] };

	// Sort orders by date
	[orderRequest, orderActive, orderHistory].forEach(arr => arr?.sort?.(sortByDate));

	const orderAction = async (orderID: string, action: TOrderAction) => {
		if (orderActionLoading) return;
		
		setOrderActionLoading(true);
		try {
			const req = await fetch('/api/admin/order/action', { 
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ orderID, action }) 
			});
			
			const res = await req.json();

			if (!req.ok) {
				toast.error(res?.message || 'Order action failed');
			} else {
				toast.success(`Order ${action}ed successfully`);
			}
			
			await mutate(); // Refresh orders
		} catch (error) {
			console.error('Order action error:', error);
			toast.error('Failed to perform order action');
		} finally {
			setOrderActionLoading(false);
		}
	};

	// Refresh orders when tab changes
	useEffect(() => {
		if (tab === 'orders') {
			mutate();
		}
	}, [tab, subTab, mutate]);

	// Debug logging
	useEffect(() => {
		console.log('Orders Data:', {
			total: orderData?.length || 0,
			requests: orderRequest?.length || 0,
			active: orderActive?.length || 0,
			history: orderHistory?.length || 0,
			loading: orderLoading
		});
	}, [orderData, orderRequest, orderActive, orderHistory, orderLoading]);

	return (
		<AdminContext.Provider value={{
			profile,
			menus,
			tables,
			profileLoading,
			profileMutate,
			orderRequest,
			orderActive,
			orderHistory,
			orderAction,
			orderActionLoading,
			orderLoading,
		}}
		>
			{children}
		</AdminContext.Provider>
	);
};

export type TAdminProviderProps = {
    children?: ReactNode
}

export type TAdminInitialType = {
	profile?: TProfile,
	menus: TMenu[],
	tables: TTable[],
	profileLoading: boolean,
	profileMutate: () => Promise<void>
	orderRequest: TOrder[],
	orderActive: TOrder[],
	orderHistory: TOrder[],
	orderAction: (orderID: string, action: TOrderAction) => Promise<void>,
	orderActionLoading: boolean,
	orderLoading: boolean,
}

export type TOrderAction = 'accept' | 'complete' | 'reject' | 'rejectOnActive'