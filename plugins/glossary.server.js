export default async ({ store }) => {
  await store.dispatch('glossary/getGlossary')
}
