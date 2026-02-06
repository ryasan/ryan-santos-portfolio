import { type CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const CONTENTFUL_SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN
const CONTENTFUL_ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_ENVIRONMENT) {
	throw new Error('Contentful space ID, access token, and environment must be provided.')
}

const config: CodegenConfig = {
	generates: {
		'app/graphql/__generated/sdk.ts': {
			config: {
				dedupeFragments: true,
				exportFragmentSpreadSubTypes: true,
				inlineFragmentTypes: 'combine',
				preResolveTypes: true,
				rawRequest: false,
				skipTypename: false,
			},
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
		},
	},
	ignoreNoDocuments: true,
	noSilentErrors: true,
	overwrite: true,
	schema: [
		{
			[`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`]:
				{
					headers: {
						Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
					},
				},
		},
	],
}

export default config
