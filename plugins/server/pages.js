export default async ({ store }) => {
  await store.dispatch('pages/getPages')
}
