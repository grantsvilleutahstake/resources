

document.addEventListener('DOMContentLoaded', async () => {

    displaySpeakingAssingments()

})

async function displaySpeakingAssingments()
{
  const generalInfo = await service.getGeneralInformation()

  const row = generalInfo.find(info => info.Section === 'Speaking' && info.Key === 'Instructions')

  if(!row) return

  document.getElementById('speaking-instructions-header').innerText = row.Header

  document.getElementById('speaking-instructions').innerHTML = marked.parse(row.Value)

}