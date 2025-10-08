import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const CONTENTFUL_SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN

const config: CodegenConfig = {
	overwrite: true,
	ignoreNoDocuments: true,
	noSilentErrors: true,
	schema: [
		{
			[`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`]:
				{
					headers: {
						Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
					},
				},
		},
	],
	generates: {
		'app/graphql/__generated/sdk.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
			config: {
				rawRequest: false,
				inlineFragmentTypes: 'combine',
				skipTypename: false,
				exportFragmentSpreadSubTypes: true,
				dedupeFragments: true,
				preResolveTypes: true,
			},
		},
	},
}

export default config
