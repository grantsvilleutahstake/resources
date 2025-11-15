document.addEventListener('DOMContentLoaded', async () => {

    displayStakeConference();

})

async function displayStakeConference()
{
  //load instructions
  const generalInfo = await service.getGeneralInformation();

  const row = generalInfo.find(info => info.Section === 'Stake Conference' && info.Key === 'Instructions');

  if(!row) return;

  document.getElementById('stake-conference-header').innerText = row.Key;

  document.getElementById('stake-conference-instructions').innerHTML = marked.parse(row.Value);

  // load grid
  const stakeConference = await service.getStakeConference();

  let parent = document.getElementById('stake-conference-container');

  stakeConference.forEach((row) => {

    const template = document.getElementById('stake-conference-template').content.cloneNode(true);
    template.querySelector('.stake-conference-header').innerText = row.Date;
    template.querySelector('.presiding-authority').innerText = row.Authority;
    template.querySelector('.shelley-lane').innerText = row.ShelleyLane;
    template.querySelector('.church-street').innerText = row.ChurchStreet;
    template.querySelector('.durfee').innerText = row.Chairs;
    
    parent.appendChild(template);
  });
}