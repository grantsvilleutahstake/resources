

document.addEventListener('DOMContentLoaded', async () => {

    displayHeader();

})

// display
async function displayHeader()
{
  const generalInfo = await service.getGeneralInformation();

  const titleRow = generalInfo.find(row => row.Section == 'Header' && row.Key == 'Title')

  document.getElementById('title').innerText = titleRow.Value.replace('<p>','').replace('</p>','');
}