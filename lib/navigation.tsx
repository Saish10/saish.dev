import { useMemo } from 'react';
import { useTheme } from 'next-themes';


import { usePersistantState } from '~/lib';

import { NavigationItemType, Theme } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: 'Home',
			href: '/',
		},
		/** 	{
				type: NavigationItemType.LINK,
				icon: 'feather:edit-3',
				text: 'Blog',
				href: '/blog',
			},
			*/
		{
			type: NavigationItemType.LINK,
			icon: 'feather:copy',
			text: 'Projects',
			href: '/projects',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:clock',
			text: 'Timeline',
			href: '/timeline',
		},

	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:twitter',
			text: 'Twitter',
			href: 'https://twitter.com/Saish_14',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:github',
			text: 'GitHub',
			href: 'https://github.com/Saish10',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:linkedin',
			text: 'LinkedIn',
			href: 'https://www.linkedin.com/in/saish-naik-b11507168/',
			external: true,
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:instagram',
			text: 'Instagram',
			href: 'https://www.instagram.com/s.a.i.s.h_/',
			external: true,
		},
	],
];

export function useNavigation() {
	const state = usePersistantState();
	const { animations: background, sound } = state.get();

	const { theme, setTheme } = useTheme();

	const isDark = useMemo(() => {
		if (theme === Theme.SYSTEM)
			return window.matchMedia('(prefers-color-scheme: dark)').matches;

		return theme === Theme.DARK;
	}, [theme]);

	const menuItems: NavigationItems = [
		...staticMenuItems,

	];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-square' : 'feather:square',
				text: `Animations ${background ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:moon',
				endIcon: isDark ? 'feather:check-square' : 'feather:square',
				text: `Dark Theme ${isDark ? 'On' : 'Off'}`,
				onClick: () => setTheme(isDark ? 'light' : 'dark'),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-square' : 'feather:square',
				text: `Sounds ${sound ? 'On' : 'Off'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
