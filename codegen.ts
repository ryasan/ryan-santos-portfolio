import { type CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const CONTENTFUL_SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN

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
			[`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`]:
				{
					headers: {
						Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
					},
				},
		},
	],
}

export default config
