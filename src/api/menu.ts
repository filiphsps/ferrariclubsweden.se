import { GQLFetcher, getCanonicalPath } from './client';

import { gql } from '@apollo/client';

// FIXME: MenuModel
interface MenuApiProps {
    slug: string;
}
export const MenuApi = async ({ slug }: MenuApiProps): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            // TODO: Pass auth with this
            const { data, errors } = await (
                await GQLFetcher({})
            ).query({
                query: gql`
                    query Menu($slug: ID!) {
                        menu(id: $slug, idType: SLUG) {
                            name
                            menuItems(where: { parentDatabaseId: 0 }) {
                                nodes {
                                    id
                                    path
                                    label
                                    parentId

                                    childItems {
                                        nodes {
                                            id
                                            path
                                            label
                                            parentId
                                            isRestricted

                                            childItems {
                                                nodes {
                                                    id
                                                    path
                                                    label
                                                    parentId
                                                    isRestricted
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
                variables: {
                    slug
                }
            });

            if (errors) throw errors;
            else if (!data?.menu) return reject();

            const getCanonicalPathWrapper = (path: string) => {
                if (path.includes('://')) {
                    return path
                        .replaceAll('http://https://', 'https://') // Bug from the WordPress backend.
                        .replaceAll('http://', 'https://')
                        .replaceAll('https://api.ferrariclubsweden.se/', '/wp/');
                }

                return getCanonicalPath(path);
            };

            let res = data.menu.menuItems.nodes.map((item: any) => [
                {
                    ...item,
                    level: 0,
                    path: getCanonicalPathWrapper(item.path),
                    childItems: undefined
                },
                ...item.childItems.nodes
                    .map((item: any) => [
                        { ...item, childItems: undefined, level: 1 },
                        ...item.childItems.nodes.map((item: any) => ({
                            ...item,
                            path: getCanonicalPathWrapper(item.path),
                            level: 2
                        }))
                    ])
                    .flat(1)
            ]);

            return resolve(res);
        } catch (error: any) {
            console.error(error);
            return reject(error);
        }
    });
};
