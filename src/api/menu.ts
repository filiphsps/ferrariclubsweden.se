import Client from './client';
import { gql } from '@apollo/client';

// FIXME: MenuModel
export const MenuApi = async (): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await Client.query({
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

                                                childItems {
                                                    nodes {
                                                        id
                                                        path
                                                        label
                                                        parentId
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

            const res = data.menus.nodes[0].menuItems.nodes.map((item: any) => [
                {
                    ...item,
                    level: 0,
                    childItems: undefined
                },
                ...item.childItems.nodes
                    .map((item: any) => [
                        { ...item, childItems: undefined, level: 1 },
                        ...item.childItems.nodes.map((item: any) => ({
                            ...item,
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
