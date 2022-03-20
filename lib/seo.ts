import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'Saish Naik';
	const description = "Hey 👋 I'm Saish, a Developer";

	return {
		title,
		description,
		canonical: `https://saish-dev.vercel.app/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'saish',
			url: `https://saish-dev.vercel.app/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: '/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@Saish_14',
			site: '@Saish_14',
		},
		...props,
	};
}
