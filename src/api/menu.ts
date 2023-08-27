import Client, { getCanonicalPath } from './client';

import { gql } from '@apollo/client';

// FIXME: MenuModel
export const MenuApi = async (): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            // TODO: Pass auth with this
            const { data } = await (
                await Client()
            ).query({
                query: gql`
                    query PAGE_QUERY {
                        menus(where: { location: MAIN_MENU }) {
                            nodes {
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
                    }
                `
            });

            const getCanonicalPathWrapper = (path: string) => {
                if (path.includes('://')) {
                    return path
                        .replaceAll('http://https://', 'https://') // Bug from the WordPress backend.
                        .replaceAll('http://', 'https://')
                        .replaceAll('https://api.ferrariclubsweden.se/', '/wp/');
                }

                return getCanonicalPath(path);
            };

            let res = data.menus.nodes[0].menuItems.nodes.map((item: any) => [
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

            resolve(res);
        } catch (err) {
            console.error(err);
            reject();
        }
    });
};
