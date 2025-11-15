document.addEventListener('DOMContentLoaded', async () => {
    displayTableOfContents()
})


displayTableOfContents = async () =>
{
  const tableOfContents = await service.getTableOfContents()

  let parent = document.getElementById('toc-container')

  tableOfContents.forEach((row) => {
    const template = document.getElementById('toc-template').content.cloneNode(true)
    template.querySelector('a').innerText = row.Title
    template.querySelector('a').href = `${row.Anchor}.html`
    template.querySelector('.section-name').innerText = `Section ${row.Section}`

    parent.appendChild(template)
  })
}