export default async ({ store }) => {
  await store.dispatch('analysis/getTags')
}
